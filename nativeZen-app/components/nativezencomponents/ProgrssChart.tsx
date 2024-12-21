import React, { useContext } from 'react';
import { ProgressChart as RNProgressChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet, View, Text, useColorScheme } from 'react-native';

interface ProgressChartProps {
  data: number[]; // Array of progress percentages (0 to 1)
  width?: number;
  height?: number;
  title?: string;
}

// Theme configuration
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

const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32, // Account for padding
  height = 220,
  title = 'Progress'
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
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.chartContainer}>
        <RNProgressChart
          data={{ data }}
          width={width}
          height={height}
          strokeWidth={16}
          radius={32}
          chartConfig={theme.chart}
          hideLegend={false}
        />
      </View>
    </View>
  );
};

// Example ThemeContext (use the same ThemeContext from PieChart)
export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export default ProgressChart;
