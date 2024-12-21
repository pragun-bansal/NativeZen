import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, useColorScheme } from 'react-native';
import { ProgressChart as RNProgressChart } from 'react-native-chart-kit';
import { PieChart as RNPieChart } from 'react-native-chart-kit';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

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

interface DataVisualizationProps {
  type: 'progress' | 'pie' | 'line'; // chart type
  data: any; // Data to be passed to the chart
  width?: number;
  height?: number;
  title?: string;
  chartConfig?: object;
  showGrid?: boolean;
  isBezier?: boolean;
}

export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

const DataVisualization: React.FC<DataVisualizationProps> = ({
  type,
  data,
  width = Dimensions.get('window').width - 32, // Default width
  height = 220,
  title = 'Chart',
  chartConfig,
  showGrid = true,
  isBezier = false,
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

  // Render Progress Chart
  const renderProgressChart = () => (
    <RNProgressChart
      data={{ data }}
      width={width}
      height={height}
      strokeWidth={16}
      radius={32}
      chartConfig={theme.chart}
      hideLegend={false}
    />
  );

  // Render Pie Chart
  const renderPieChart = () => {
    const total = data.reduce((sum: number, item: { population: number }) => sum + item.population, 0);
    return (
      <RNPieChart
        data={data}
        width={width}
        height={height}
        chartConfig={theme.chart}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    );
  };

  // Render Line Chart
  const renderLineChart = () => (
    <RNLineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig || theme.chart}
      onDataPointClick={() => {}}
      bezier={isBezier}
      style={{ marginVertical: 8 }}
    />
  );

  const renderChart = () => {
    switch (type) {
      case 'progress':
        return renderProgressChart();
      case 'pie':
        return renderPieChart();
      case 'line':
        return renderLineChart();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
    </View>
  );
};

export default DataVisualization;
