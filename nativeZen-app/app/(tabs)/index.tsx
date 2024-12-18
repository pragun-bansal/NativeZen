import '@/styles/global.css'
import { SafeAreaView } from 'react-native';
import FAQSection from '@/components/nativezencomponents/FAQSection';

export default function HomeScreen() {

  const faqs = [
    {
      question: 'What is this app about?',
      answer: 'This app helps you manage tasks efficiently and stay organized.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Account > Reset Password and follow the instructions.',
    },
    {
      question: 'Is this app free?',
      answer: 'Yes, this app is completely free to use with no hidden charges.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support via the Help section in the app or email us directly.',
    },
  ];


  return (
    <SafeAreaView style={{ flex: 1,marginTop: 16 }}>
    <FAQSection faqs={faqs} theme="light" animationStyle="slide" />
  </SafeAreaView>
  );
}
