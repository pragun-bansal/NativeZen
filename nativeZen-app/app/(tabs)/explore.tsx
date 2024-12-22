import BentoGrid from '@/components/nativezencomponents/BentoGrid';
import { CardsCarouselDemo } from '@/components/nativezencomponents/Cards/CardCarouselDemo';
import ContributionGraph from '@/components/nativezencomponents/ContributionGraph';
import Grid from '@/components/nativezencomponents/Grid';
import LineChart from '@/components/nativezencomponents/LineChart';
import MarkdownViewer from '@/components/nativezencomponents/Markdown';
import PieChart from '@/components/nativezencomponents/PieChart';
import ProgressChart from '@/components/nativezencomponents/ProgrssChart';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, View, Button,Text, Dimensions } from 'react-native';

const bentoItems = [
  {
    id: '1',
    content: 'Featured Item',
    size: 'large',
    backgroundColor: '#FFE8E8',
    priority: 1,
  },
  {
    id: '2',
    content: 'Wide Content',
    size: 'wide',
    backgroundColor: '#E8FFE8',
    priority: 2,
  },
  {
    id: '3',
    content: 'Tall Item',
    size: 'tall',
    backgroundColor: '#E8E8FF',
    priority: 3,
  },
  {
    id: '4',
    content: "Item",
    size: 'medium',
    backgroundColor: '#FFF0E8',
  },
  {
    id: '5',
    content: 'Small Item',
    size: 'small',
    backgroundColor: '#E8FFF0',
  },
];

const copy = `
# Main Heading (H1)

This is a paragraph with **bold** text, *italicized* text, and a [link](https://example.com).

## Subheading 1 (H2)

This is another paragraph, where we can include an \`inline code\` snippet. Below is a code block:

\`\`\`
function greet() {
  console.log("Hello, World!");
}
\`\`\`

### Subheading 2 (H3)

Here’s a blockquote:

> This is a blockquote. It can contain multiple lines of text.

#### Subheading 3 (H4)

- Item 1 in a list
- Item 2 in a list
- Item 3 in a list

##### Unordered List
- Point A
- Point B
  - Sub Point 1
  - Sub Point 2

###### Another Ordered List:
1. First item
2. Second item
3. Third item

---

## Table Example

| Name        | Age | Occupation   |
|-------------|-----|--------------|
| John Doe    | 30  | Software Dev |
| Jane Smith  | 25  | Designer     |
| Alice Brown | 28  | Product Mgr  |

---

## Image Example

Here’s an image:

![Sample Image](https://via.placeholder.com/600x400)

---

Here is a **horizontal rule**:

---

## Final Thoughts

This Markdown file contains various elements like **headings**, **text formatting**, **code blocks**, **lists**, **tables**, **images**, and **blockquotes**.
`;



export default function TabTwoScreen() {

  const data = [
    { name: "Seoul", population: 21500000, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Toronto", population: 2800000, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Beijing", population: 527612, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "New York", population: 8538000, color: "#000", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Moscow", population: 11920000, color: "rgb(0, 0, 255)", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  ];

  const chartConfig = {
    backgroundColor: "#1cc910",
    backgroundGradientFrom: "#eff3ff",
    backgroundGradientTo: "#efefef",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const [theme, setTheme] = useState('light');
  
  const items = [
    {
      id: '1',
      content: 'Item 1',
      size: 'small',
      backgroundColor: '#FF6347',
      onPress: () => alert('Item 1 clicked'),
      animationDelay: 100,
    },
    {
      id: '2',
      content: 'Item 2',
      size: 'medium',
      backgroundColor: '#FF4500',
      onPress: () => alert('Item 2 clicked'),
      animationDelay: 200,
    },
    {
      id: '3',
      content: 'Item 3',
      size: 'large',
      backgroundColor: '#32CD32',
      onPress: () => alert('Item 3 clicked'),
      animationDelay: 300,
    },
    {
      id: '4',
      content: 'Item 4',
      size: 'small',
      backgroundColor: '#1E90FF',
      onPress: () => alert('Item 4 clicked'),
      animationDelay: 400,
    },
    {
      id: '5',
      content: 'Item 5',
      size: 'wide',
      backgroundColor: '#FFD700',
      onPress: () => alert('Item 5 clicked'),
      animationDelay: 500,
    },
  ];

  const [data2, setData] = useState([
    { date: '2024-01-01', contributions: 10 },
    { date: '2024-01-02', contributions: 5 },
    { date: '2024-01-03', contributions: 15 },
    { date: '2024-01-04', contributions: 0 },
    { date: '2024-01-05', contributions: 20 },
    { date: '2024-01-06', contributions: 7 },
    { date: '2024-01-07', contributions: 30 },
  ]);
  const contributionData = [
    { date: '2023-01-01', contributions: 5 },
    { date: '2023-01-02', contributions: 10 },
    { date: '2023-01-03', contributions: 3 },
    { date: '2023-01-04', contributions: 8 },
    { date: '2023-01-05', contributions: 20 },
    { date: '2023-01-06', contributions: 7 },
    { date: '2023-01-07', contributions: 15 },
    // Add more data points to see the full scrollable graph
  ];
  return (
    // <MarkdownViewer markdownData={copy} />
//     <View style={styles.container}>
//     <Button title="Toggle Theme" onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
//     {/* <Grid
//   items={items}
//   columns={3}
//   gap={15}
//   animationType="scale"
//   staggerDelay={50}
//   onRefresh={async () => {
//     // Handle refresh
//   }}
//   onEndReached={() => {
//     // Load more items
//   }}
//   onItemPress={(item) => console.log('Pressed item:', item)}
//   masonry={true}
//   header={<Text>Grid Header</Text>}
//   footer={<Text>Grid Footer</Text>}
// /> */}
//  <BentoGrid
//         items={items}
//         gap={15} // Optional: controls the gap between items
//         animationType="scale" // Optional: can be 'fade', 'slide', 'scale', or 'rotate'
//         baseItemSize={120} // Optional: controls the base size of items
//         maxColumns={3} // Optional: max number of columns in the grid
//         aspectRatio={1} // Optional: aspect ratio for the items (height/width)
//         layout="adaptive" // Optional: use 'fixed' for a static layout or 'adaptive' for a responsive layout
//         onItemPress={(item) => alert(`You pressed: ${item.content}`)} // Optional: handle item press
//       />
//   </View>



<SafeAreaView style={{ flex: 1 }}>
  <ScrollView>
    {/* <LineChart*/}
    {/*  data={{*/}
    {/*    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],*/}
    {/*    datasets: [*/}
    {/*      {*/}
    {/*        data: [50, 100, 150, 80, 200, 250],*/}
    {/*        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color*/}
    {/*        strokeWidth: 2,*/}
    {/*      },*/}
    {/*    ],*/}
    {/*  }}*/}
    {/*  width={Dimensions.get("window").width - 32} // Add some padding*/}
    {/*  height={250}*/}
    {/*  chartConfig={{*/}
    {/*    backgroundColor: "#1e2923",*/}
    {/*    backgroundGradientFrom: "#08130d",*/}
    {/*    backgroundGradientTo: "#08130d",*/}
    {/*    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Chart lines*/}
    {/*    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Labels*/}
    {/*  }}*/}
    {/*  showGrid={true}*/}
    {/*  isBezier={true} // Toggle Bezier curve*/}
    {/*/>*/}
    <PieChart data={data} chartConfig={chartConfig} hasLegend={true} />
    <ProgressChart
          data={[0.4, 0.6, 0.8]} // Example progress values
          title="Project Completion Status"
        />
         <ContributionGraph
            data={contributionData}
            title="User Contributions"
            width={700} // Adjust width to test scrolling
            height={300}
          />
  </ScrollView>
</SafeAreaView>

    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
});