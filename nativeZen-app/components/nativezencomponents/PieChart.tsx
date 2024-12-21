import React, { useContext } from 'react';
import { PieChart as RNPieChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet, View, Text, useColorScheme } from 'react-native';

interface PieChartProps {
  data: {
    name: string;
    population: number;
    color: string;
  }[];
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

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32, // Account for padding
  height = 220,
  title = 'Distribution'
}) => {
  const systemTheme = useColorScheme();
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext?.theme || systemTheme || 'light';
  const theme = themes[currentTheme];

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.population, 0);

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
      </View>

      <View style={styles.divider} />

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.colorIndicator, { backgroundColor: item.color }]}
            />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendLabel}>{item.name}</Text>
              <Text style={styles.legendValue}>
                {item.population.toLocaleString()} ({((item.population / total) * 100).toFixed(1)}%)
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// Example ThemeContext (create in a separate file)
export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export default PieChart;