import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import  Timeline from '@/components/nativezencomponents/Timeline';
import TypewriterEffectSmooth  from '@/components/nativezencomponents/TypewriterEffectSmooth';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the structure of the data
interface Event {
  title: {
    content: string;
  };
  description: {
    content: string;
  };
  time: {
    content: string;
  };
  icon?: {
    content: string;
  };
}

// Data
const data: Event[] = [
  {
    title: {
      content: 'Event One Title',
    },
    description: {
      content: 'Event One Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Two Title',
    },
    description: {
      content: 'Event Two Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Three Title',
    },
    description: {
      content: 'Event Three Description',
    },
    time: {
      content: moment().format('ll'),
    },
    icon: {
      content: 'pencil',
    },
  },
  {
    title: {
      content: 'Event Four Title',
    },
    description: {
      content: 'Event Four Description',
    },
    time: {
      content: moment().format('ll'),
    },
    icon: {
      content: 'user',
    },
  },
  {
    title: {
      content: 'Event Five Title',
    },
    description: {
      content: 'Event Five Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Six Title',
    },
    description: {
      content: 'Event Six Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Seven Title',
    },
    description: {
      content: 'Event Seven Description',
    },
    time: {
      content: moment().format('ll'),
    },
    icon: {
      content: 'check',
    },
  },
];

// Header component
const TimelineHeader: React.FC = () => (
  <View style={styles.timelineHeadingContainer}>
    <Text style={styles.timelineHeadingTitleText}>Default Timeline</Text>
    <View style={styles.underline} />
  </View>
);

// Main component
const Example1: React.FC = () => {
  const words = [
    { text: 'Hello', className: 'text-blue-500' },
    { text: 'World!', className: 'text-red-500' },
  ];
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <TypewriterEffectSmooth
        textArray={["Hey this is shivam gupta i am co founder of native zen that is a  ui library"]}
      />
    </SafeAreaView>
  );
};

export default Example1;

// Styles
const styles = StyleSheet.create({
  exampleContainer: {
    height: Dimensions.get('window').height,
    paddingHorizontal: 13,
    paddingTop: 40,
  },
  timelineHeadingContainer: { paddingVertical: 30, paddingHorizontal: 15 },
  timelineHeadingTitleText: { fontSize: 26, fontWeight: 'bold', color: '#222' },
  underline: {
    height: 3,
    width: '30%',
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: '#6F98FA',
    marginLeft: 20,
  },
});
