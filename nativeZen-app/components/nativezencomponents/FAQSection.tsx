import React from 'react';
import { View, ScrollView } from 'react-native';
import Accordion, { AccordionProps, defaultThemes } from './Accordion'; 
import { AntDesign } from '@expo/vector-icons';

interface FAQSectionProps {
  faqs: {
    title: string;
    content: string;
    key?: string;
    icon?: React.ComponentProps<typeof AntDesign>['name'];
    expandedIcon?: React.ComponentProps<typeof AntDesign>['name'];
    customStyles?: {
      container?: string;
      title?: string;
      content?: string;
      icon?: string;
    };
    animationStyle?: 'fade' | 'scale';
    onExpand?: () => void;
    onCollapse?: () => void;
    defaultExpanded?: boolean;
    iconSize?: number;
    animationDuration?: number;
    blurEffect?: boolean;
  }[];  
  theme?: keyof typeof defaultThemes | { [key: string]: string };  // Allow custom theme object
  animationStyle?: 'fade' | 'scale';
  iconSize?: number;
  animationDuration?: number;
  blurEffect?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  theme = 'light',
  animationStyle = 'scale',
  iconSize = 20,
  animationDuration = 300,
  blurEffect = false,
}) => {

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-col space-y-6"> {/* Consistent spacing between accordions */}
        {faqs.map((faq, index) => (
          <View key={faq.key || index} style={{ marginVertical: 4 }}> {/* Adding margin for consistent gaps */}
            <Accordion
              title={faq.title}
              content={faq.content}
              theme={theme}
              icon={faq.icon}
              expandedIcon={faq.expandedIcon}
              customStyles={faq.customStyles}
              onExpand={faq.onExpand}
              onCollapse={faq.onCollapse}
              defaultExpanded={faq.defaultExpanded}
              iconSize={faq.iconSize || iconSize}
              animationStyle={faq.animationStyle || animationStyle}
              animationDuration={faq.animationDuration || animationDuration}
              blurEffect={faq.blurEffect || blurEffect}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQSection;
