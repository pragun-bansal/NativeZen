import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View, Text, useColorScheme, ScrollView } from 'react-native';
import { ContributionGraph as RNContributionGraph } from 'react-native-chart-kit';

// Theme configuration (same as before)
const themes = {
  light: {
    background: '#FFFFFF',
    text: '#1A1A1A',
    subText: '#666666',
    border: '#E5E5E5',
    chart: {
      backgroundColor: '#FFFFFF',
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }
  },
  dark: {
    background: '#1A1A1A',
    text: '#FFFFFF',
    subText: '#AAAAAA',
    border: '#333333',
    chart: {
      backgroundColor: '#1A1A1A',
      backgroundGradientFrom: '#1A1A1A',
      backgroundGradientTo: '#1A1A1A',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
  }
};

interface ContributionGraphProps {
  data: { date: string; contributions: number }[]; // Example format
  width?: number;
  height?: number;
  title?: string;
}

// ContributionGraph component
const ContributionGraph: React.FC<ContributionGraphProps> = ({
  data,
  width = Dimensions.get('window').width - 32, // Account for padding
  height = 220,
  title = 'Contribution Graph'
}) => {
  const systemTheme = useColorScheme();
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext?.theme || systemTheme || 'light';
  const theme = themes[currentTheme];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
      margin: 16,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    titleContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    chartContainer: {
      alignItems: 'center',
    },
    legendContainer: {
      marginTop: 24,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    colorIndicator: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 12,
    },
    legendTextContainer: {
      flex: 1,
    },
    legendLabel: {
      fontSize: 16,
      color: theme.text,
      fontWeight: '500',
    },
    legendValue: {
      fontSize: 14,
      color: theme.subText,
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 8,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.chartContainer}>
        {/* Horizontal ScrollView for the chart */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RNContributionGraph
            values={data} // Format: [{ date: 'YYYY-MM-DD', contributions: number }]
            endDate={new Date()}
            numDays={365}
            width={width}
            height={height}
            chartConfig={theme.chart}
            tooltipDataAttrs={{
              showTooltip: true,
              fontSize: 12,
              fontFamily: 'Arial',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              textColor: '#FFFFFF'
            }}
          />
        </ScrollView>
      </View>

      <View style={styles.divider} />

      <View style={styles.legendContainer}>
        {/* Example Legend - customize according to contribution values */}
        <View style={styles.legendItem}>
          <View style={[styles.colorIndicator, { backgroundColor: '#4caf50' }]} />
          <View style={styles.legendTextContainer}>
            <Text style={styles.legendLabel}>High Contributions</Text>
            <Text style={styles.legendValue}>Above 80</Text>
          </View>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorIndicator, { backgroundColor: '#ffeb3b' }]} />
          <View style={styles.legendTextContainer}>
            <Text style={styles.legendLabel}>Medium Contributions</Text>
            <Text style={styles.legendValue}>40 - 80</Text>
          </View>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorIndicator, { backgroundColor: '#f44336' }]} />
          <View style={styles.legendTextContainer}>
            <Text style={styles.legendLabel}>Low Contributions</Text>
            <Text style={styles.legendValue}>Below 40</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Example ThemeContext (create in a separate file)
export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export default ContributionGraph;
