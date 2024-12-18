import React from 'react';
import { View, ScrollView } from 'react-native';
import FAQCard, { FAQCardProps, themes } from './FAQCard'; // Assuming FAQCard is in the same directory
import { AntDesign } from '@expo/vector-icons';

interface FAQSectionProps {
  faqs: {
    question: string;
    answer: string;
    key?: string;
    icon?: React.ComponentProps<typeof AntDesign>['name'];
    expandedIcon?: React.ComponentProps<typeof AntDesign>['name'];
    customStyles?: {
      container?: string;
      question?: string;
      answer?: string;
      icon?: string;
    };
    animationStyle?: 'fade' | 'slide' | 'scale';
    onExpand?: () => void;
    onCollapse?: () => void;
    defaultExpanded?: boolean;
    iconSize?: number;
    animationDuration?: number;
    blurEffect?: boolean;
  }[];
  theme?: keyof typeof themes;
  animationStyle?: 'fade' | 'slide' | 'scale';
  iconSize?: number;
  animationDuration?: number;
  blurEffect?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  theme = 'light',
  animationStyle = 'fade',
  iconSize = 20,
  animationDuration = 300,
  blurEffect = false,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-col space-y-8">
        {faqs.map((faq, index) => (
          <FAQCard
            key={faq.key || index} // Ensure uniqueness by using a key prop
            question={faq.question}
            answer={faq.answer}
            theme={theme}
            icon={faq.icon}
            expandedIcon={faq.expandedIcon}
            customStyles={faq.customStyles}
            animationStyle={faq.animationStyle || animationStyle}
            onExpand={faq.onExpand}
            onCollapse={faq.onCollapse}
            defaultExpanded={faq.defaultExpanded}
            iconSize={faq.iconSize || iconSize}
            animationDuration={faq.animationDuration || animationDuration}
            blurEffect={faq.blurEffect || blurEffect}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQSection;
