import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import moment from 'moment';
import  Timeline from '@/components/nativezencomponents/Timeline';
import TypewriterEffectSmooth  from '@/components/nativezencomponents/TypewriterEffect/TypewriterEffectSmooth';
import { SafeAreaView} from 'react-native-safe-area-context';
import {CardsCarouselDemo} from "@/components/nativezencomponents/Cards/CardCarouselDemo";
import {AppleCardsCarouselDemo} from "@/components/nativezencomponents/Cards/AppleCardCarouselDemo";
import OverlayCard from "@/components/nativezencomponents/Cards/OverlayCard";
import Bounce from "@/components/nativezencomponents/Backgrounds/Bounce";
import BounceGravity from "@/components/nativezencomponents/Backgrounds/BounceGravity";
import GridDotsBackground from "@/components/nativezencomponents/Backgrounds/GridDotsBackground";
import GridLinesBackground from "@/components/nativezencomponents/Backgrounds/GridLinesBackground";
import { ImageCarousel } from '@/components/nativezencomponents/ImageCarousel';
import {SignupForm} from "@/components/nativezencomponents/Forms/SignupForm";
import {LitUpBordersButton} from "@/components/nativezencomponents/Buttons/LitUpBordersButton";
import {SpotlightPreview,Spotlight} from "@/components/nativezencomponents/Backgrounds/Spotlight";
import Animated from "react-native-reanimated";
import {AnimatedBeam} from "@/components/nativezencomponents/AnimatedBeam";
import DemoList from "@/components/nativezencomponents/List/DemoList";

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

const appleData = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Header component
const TimelineHeader: React.FC = () => (
  <View style={styles.timelineHeadingContainer}>
    <Text style={styles.timelineHeadingTitleText}>Default Timeline</Text>
    <View style={styles.underline} />
  </View>
);

const OverlayItem={
      header: "Pragun Bansal",
      category: "Hiring",
      title: "Hiring for a Staff Software Engineer",
      src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pfp: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }



// Main component
const Example1: React.FC = () => {
  const words = [
    { text: 'Hello', className: 'text-blue-500' },
    { text: 'World!', className: 'text-red-500' },
  ];
  return (
    <SafeAreaView style={styles.exampleContainer}>
      <ScrollView style={styles.scrollContainer}>
      {/*<TypewriterEffectSmooth*/}
      {/*    sequence={[*/}
      {/*      { type: "typeString", value: "Hi we are Pragun Bansal and Shivam Gupta," },*/}
      {/*      { type: "pause", duration: 1000 },*/}
      {/*      { type: "typeString", value: "Co-founders of MobUIle." },*/}
      {/*      { type: "pause", duration: 500 },*/}
      {/*      { type: "deleteChars", count: 8 },*/}
      {/*      { type: "pause", duration: 500 },*/}
      {/*      { type: "typeString", value: "NativeZen." },*/}
      {/*    ]}*/}
      {/*    minSpeed={50}*/}
      {/*    maxSpeed={100}*/}
      {/*    textStyle={styles.text}*/}
      {/*    cursorStyle={styles.cursor}*/}
      {/*/>*/}
      {/*<CardsCarouselDemo data={appleData}  autoAnimateInterval={1000} />*/}
      {/*  <OverlayCard item={OverlayItem} height={300} />*/}
        {/*<AppleCardsCarouselDemo cardCategoryStyle={{fontSize:20}} cardTitleStyle={{fontSize:20,paddingVertical:10}} data={appleData} height={500} theme={"dark"}  autoAnimateInterval={1000} />*/}

        {/*<Bounce/>*/}
        {/*<BounceGravity height={700} width={400}/>*/}
        {/* <ImageCarousel /> */}
        {/*<ImageCarousel />*/}

        {/*<GridLinesBackground width={300} height={300} gap={20} text={"Backgrounds"}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"circle"}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"rect"}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"path"}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"polygon"}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"line"} size={6}/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"ellipse"} size={4}/>*/}
        {/*<SpotlightPreview />*/}
        {/*<AnimatedBeam />*/}
        <DemoList />
        {/*<SignupForm/>*/}
        {/*<GridDotsBackground width={300} height={300} gap={20} text={"Backgrounds"} shape={"text"} textContent={"Hi"}/>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Example1;

// Styles
const styles = StyleSheet.create({
  exampleContainer: {
    // paddingHorizontal: 13,
    paddingVertical:0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  scrollContainer:{

  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  cursor: {
    fontSize: 24,
    color: "#fff",
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