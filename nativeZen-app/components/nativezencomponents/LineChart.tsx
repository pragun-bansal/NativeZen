import React, { useState } from "react";
import { LineChart as RNLineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text } from "react-native";

interface LineChartProps {
  data: {
    labels: string[];
    datasets: { data: number[]; color?: string; strokeWidth?: number }[];
  };
  width?: number;
  height?: number;
  chartConfig: {
    backgroundColor: string;
    backgroundGradientFrom: string;
    backgroundGradientTo: string;
    color: (opacity?: number) => string;
    labelColor: (opacity?: number) => string;
  };
  showGrid?: boolean;
  isBezier?: boolean; // New property to toggle Bezier curve
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = Dimensions.get("window").width,
  height = 220,
  chartConfig,
  showGrid = true,
  isBezier = false, // Default to false
}) => {
  const [tooltip, setTooltip] = useState<{
    value: number;
    label: string;
    x: number;
    y: number;
  } | null>(null);

  const handleDataPointClick = (data: {
    value: number;
    dataset: any;
    getColor: (opacity?: number) => string;
    index: number;
    x: number;
    y: number;
  }) => {
    setTooltip({
      value: data.value,
      label: data.index < data.dataset.data.length ? data.index.toString() : "",
      x: data.x,
      y: data.y,
    });
  };

  return (
    <View style={styles.container}>
      <RNLineChart
        data={data}
        width={width}
        height={height}
        chartConfig={{
          ...chartConfig,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: chartConfig.backgroundColor,
          },
          propsForBackgroundLines: {
            strokeDasharray: showGrid ? undefined : "0",
          },
        }}
        onDataPointClick={handleDataPointClick}
        bezier={isBezier} // Use the isBezier prop
      />
      {tooltip && (
        <View
          style={[
            styles.tooltip,
            { top: tooltip.y - 40, left: tooltip.x - 30 },
          ]}
        >
          <Text style={styles.tooltipText}>
            {tooltip.label}: {tooltip.value}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tooltipText: {
    fontSize: 12,
    color: "#333",
  },
});

export default LineChart;
