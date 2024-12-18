import '@/styles/global.css'
import {SafeAreaView, ScrollView} from 'react-native';
import FAQSection from '@/components/nativezencomponents/FAQSection';
import ParallaxScroll from '@/components/nativezencomponents/ParallaxScroll';
import {SimpleButton} from "@/components/nativezencomponents/buttons/SimpleButton";
import {InvertButton} from "@/components/nativezencomponents/buttons/InvertButton";
import {UnapologeticButton} from "@/components/nativezencomponents/buttons/UnapologeticButton";
import {GradientButton} from "@/components/nativezencomponents/buttons/GradientButton";
import {SketchButton} from "@/components/nativezencomponents/buttons/SketchButton";
import {LitUpBordersButton} from "@/components/nativezencomponents/buttons/LitUpBordersButton";
import {BorderMagicButton} from "@/components/nativezencomponents/buttons/BorderMagicButton";
import {BrutalButton} from "@/components/nativezencomponents/buttons/BrutalButton";
import {FavouriteButton} from "@/components/nativezencomponents/buttons/FavouriteButton";
import {OutlineButton} from "@/components/nativezencomponents/buttons/OutlineButton";
import {ShimmerButton} from "@/components/nativezencomponents/buttons/ShimmerButton";
import {NextJsBlueButton} from "@/components/nativezencomponents/buttons/NextJsBlueButton";
import {NextJsWhiteButton} from "@/components/nativezencomponents/buttons/NextJsWhiteButton";
import {SpotifyButton} from "@/components/nativezencomponents/buttons/SpotifyButton";
import {BackdropBlurButton} from "@/components/nativezencomponents/buttons/BackdropBlurButton";
import {PlaylistButton} from "@/components/nativezencomponents/buttons/PlaylistButton";
import {FigmaButton} from "@/components/nativezencomponents/buttons/FigmaButton";
import {FigmaOutlineButton} from "@/components/nativezencomponents/buttons/FigmaOutlineButton";
import {TopGradientButton} from "@/components/nativezencomponents/buttons/TopGradientButton";

export default function HomeScreen() {

  const faqs = [
    {
      title: 'What is this app about?',
      content: 'This app helps you manage tasks efficiently and stay organized.',
    },
    {
      title: 'How do I reset my password?',
      content: 'Go to Settings > Account > Reset Password and follow the instructions.',
    },
    {
      title: 'Is this app free?',
      content: 'Yes, this app is completely free to use with no hidden charges.',
    },
    {
      title: 'How do I contact support?',
      content: 'You can contact support via the Help section in the app or email us directly.',
    },
  ];

  const images = [
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
     ];

  return (

    <SafeAreaView className="flex-1 mt-16 ">
      <ScrollView className='flex-1'>
      {/* <FAQSection faqs={faqs} theme="light" animationStyle='scale' /> */}
  {/*    <ParallaxScroll*/}
  {/*      images={images}*/}
  {/*      gridRows={3}*/}
  {/*rowSpeeds={[100, 60, 100]} // Custom speed for each row*/}
  {/*theme="dark" // Dark theme*/}
  {/*containerStyle={{ marginTop: 20 }}*/}
  {/*imageStyle={{ borderRadius: 15 }}*/}
  {/*    />*/}
      {/*<ParallaxScroll*/}
      {/*  images={images}*/}
      {/*  scrollSpeed={80}*/}
      {/*  gridColumns={3}*/}
      {/*  imageHeight={300}*/}
      {/*  blurEffect={true}*/}
      {/*  icon="search1"*/}
      {/*  animationDuration={500}*/}
      {/*/>*/}
      {/*<SketchButton />*/}
      {/*<SimpleButton />*/}
      {/*<InvertButton bgColor="#38B2AC" textColor="#fff" />*/}
      <UnapologeticButton />
      {/*<GradientButton gradientColors={['#3B82F6', '#2563EB']} textColor="#fff" />*/}
      {/*<LitUpBordersButton gradientColors={['#5C6BC0', '#3949AB']} textColor="#fff" />*/}
      <BorderMagicButton />
      <BrutalButton />
      {/*<FavouriteButton />*/}
      {/*<OutlineButton />*/}
      <ShimmerButton />
      <NextJsBlueButton />
      <NextJsWhiteButton />
      {/*<SpotifyButton />*/}
      <BackdropBlurButton />
      {/*<PlaylistButton />*/}
      <FigmaButton  />
      <FigmaOutlineButton theme="dark" />
      <TopGradientButton theme="dark" />
      </ScrollView>
    </SafeAreaView>
  );
}
