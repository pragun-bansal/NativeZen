import React from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, I18nManager, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import _isEmpty from "lodash/isEmpty";

interface EventTimeProps {
  time: {
    content: string;
    style?: object;
  };
  style?: object;
}

const EventTime: React.FC<EventTimeProps> = ({ time: { content, style: timeStyle } = {}, style }) => {
  return (
    <View style={[styles.timeContainer, style]}>
      <Text style={[styles.time, timeStyle]}>{content}</Text>
    </View>
  );
};

interface EventIconProps {
  icon: any;
  iconStyle?: object;
  lineStyle?: object;
}

const EventIcon: React.FC<EventIconProps> = ({ icon: OriginalIcon = {}, iconStyle, lineStyle }) => {
  const iconIsComponent = typeof OriginalIcon === "function";
  let iconToBeRendered = iconIsComponent ? (
    <OriginalIcon styles={styles.icon} />
  ) : (
    <Icon
      name={OriginalIcon.content}
      style={[styles.icon, OriginalIcon.style && !_isEmpty(OriginalIcon.style) ? OriginalIcon.style : null]}
    />
  );

  return (
    <View style={[styles.iconContainer, iconStyle]}>
      {iconToBeRendered}
      <View style={[styles.verticalLine, lineStyle]} />
    </View>
  );
};

interface EventProps {
  children: React.ReactNode;
  style?: object;
}

const Event: React.FC<EventProps> = ({ children, style }) => {
  return <View style={[styles.eventContainer, style]}>{children}</View>;
};

interface RowProps {
  event: {
    title: any;
    description: any;
    time: any;
    icon: any;
    pressAction?: () => void;
  };
  eventStyle?: object;
  timeContainerStyle?: object;
  iconContainerStyle?: object;
  lineStyle?: object;
  contentContainerStyle?: object;
}

const Row: React.FC<RowProps> = ({
  event = {},
  eventStyle,
  timeContainerStyle,
  iconContainerStyle,
  lineStyle,
  contentContainerStyle
}) => {
  const {
    title: OriginalTitle = {},
    description: OriginalDescription = {},
    time,
    icon,
    pressAction
  } = event;

  const RowComp = pressAction ? TouchableOpacity : View;

  const titleIsComponent = OriginalTitle && typeof OriginalTitle === "function";
  const title = titleIsComponent ? (
    <OriginalTitle styles={styles.title} />
  ) : (
    typeof OriginalTitle === "object" && !_isEmpty(OriginalTitle) && (
      <Text style={[styles.title, OriginalTitle.style]}>{OriginalTitle.content}</Text>
    )
  );

  const descriptionIsComponent =
    OriginalDescription && typeof OriginalDescription === "function";
  const description = descriptionIsComponent ? (
    <OriginalDescription styles={styles.description} />
  ) : (
    typeof OriginalDescription === "object" &&
    !_isEmpty(OriginalDescription) && (
      <Text style={[styles.description, OriginalDescription.style]}>
        {OriginalDescription.content}
      </Text>
    )
  );

  return (
    <RowComp style={[styles.row, eventStyle]} onPress={pressAction}>
      <EventTime time={time} style={timeContainerStyle} />
      <EventIcon
        icon={icon}
        iconStyle={iconContainerStyle}
        lineStyle={lineStyle}
      />
      <Event style={contentContainerStyle}>
        {title}
        {description}
      </Event>
    </RowComp>
  );
};

interface TimelineProps {
  data: Array<any>;
  eventStyle?: object;
  timeContainerStyle?: object;
  iconContainerStyle?: object;
  lineStyle?: object;
  contentContainerStyle?: object;
  onEndReachedThreshold?: number;
  onEndReached?: () => void;
  TimelineFooter?: React.ReactNode;
  TimelineHeader?: React.ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({
  data = [],
  eventStyle = {},
  timeContainerStyle = {},
  iconContainerStyle = {},
  lineStyle = {},
  contentContainerStyle = {},
  onEndReachedThreshold,
  onEndReached,
  TimelineFooter,
  TimelineHeader,
  ...rest
}) => {
  const events = (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Row
          event={item}
          eventStyle={eventStyle}
          timeContainerStyle={timeContainerStyle}
          iconContainerStyle={iconContainerStyle}
          lineStyle={lineStyle}
          contentContainerStyle={contentContainerStyle}
        />
      )}
      keyExtractor={(_, ndx) => ndx.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold || 0}
      ListFooterComponent={TimelineFooter}
      ListHeaderComponent={TimelineHeader}
      {...rest}
    />
  );

  return <View style={styles.container}>{events}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5
  },
  timeContainer: {
    flexBasis: "25%"
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    fontStyle: "italic",
    textAlign: 'center'
  },
  iconContainer: {
    flexBasis: "6%",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: "5%"
  },
  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: "#ededed"
  },
  eventContainer: {
    flexBasis: "55%",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 15,
    shadowOffset: { width: I18nManager.isRTL ? 8 : -8, height: 0 },
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderTopLeftRadius: 0,
  },
  icon: {
    textAlign: "center",
    width: 20,
    height: 20,
    backgroundColor: "#6F98FA",
    paddingTop: Platform.OS === "ios" ? 2.5 : 5,
    borderRadius: 10,
    color: '#e0e9ff',
    fontSize: 9,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: '#e0e9ff'
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    textAlign: "left",
    marginBottom: 5,
    lineHeight: 20
  },
  description: {
    textAlign: "left",
    fontSize: 11,
    lineHeight: 18,
    paddingBottom: 10,
    color: '#999'
  }
});

export default Timeline;
