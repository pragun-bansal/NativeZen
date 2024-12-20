import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, ActivityIndicator, Text, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useColorScheme } from 'react-native';

type MarkdownViewerProps = {
  markdownUrl?: string;
  markdownData?: string;
};

const fetchMarkdown = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Define the correct types for markdown styles
interface MarkdownStyles {
  body: TextStyle;
  paragraph: TextStyle;
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  heading4: TextStyle;
  strong: TextStyle;
  em: TextStyle;
  link: TextStyle;
  list_item: ViewStyle;
  bullet_list: ViewStyle;
  ordered_list: ViewStyle;
  blockquote: ViewStyle;
  code_inline: TextStyle;
  code_block: ViewStyle;
  fence: ViewStyle;
  table: ViewStyle;
  thead: ViewStyle;
  th: TextStyle;
  td: TextStyle;
  tr: ViewStyle;
  image: ViewStyle;
  hr: ViewStyle;
  checkbox: ViewStyle;
  taskList: ViewStyle;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownUrl, markdownData }) => {
  const [content, setContent] = useState<string | null>(markdownData || null);
  const [loading, setLoading] = useState<boolean>(!markdownData);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the container takes up full available space
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    } as ViewStyle,
    scrollView: {
      paddingHorizontal: 24,
      marginTop: 4,
      marginBottom: 32,
    } as ViewStyle,
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
    } as ViewStyle,
    errorContainer: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#2C1818' : '#FFF5F5',
      marginHorizontal: 20,
    } as ViewStyle,
    errorText: {
      color: isDarkMode ? '#FF8A80' : '#DC2626',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '500',
    } as TextStyle,
    markdownStyles: {
      body: {
        fontSize: 16,
        color: isDarkMode ? '#E0E0E0' : '#1F2937',
        fontFamily: 'System',
        marginBottom: 40,
      },
      paragraph: {
        marginVertical: 8,
        fontSize: 16,
        lineHeight: 24,
      },
      heading1: {
        fontSize: 28,
        fontWeight: '700',
        color: isDarkMode ? '#FFFFFF' : '#111827',
        marginTop: 12,
        marginBottom: 12,
      },
      heading2: {
        fontSize: 24,
        fontWeight: '600',
        color: isDarkMode ? '#F3F4F6' : '#1F2937',
        marginTop: 20,
        marginBottom: 10,
        letterSpacing: -0.3,
      },
      heading3: {
        fontSize: 20,
        fontWeight: '600',
        color: isDarkMode ? '#E5E7EB' : '#374151',
        marginTop: 16,
        marginBottom: 8,
      },
      heading4: {
        fontSize: 18,
        fontWeight: '500',
        color: isDarkMode ? '#D1D5DB' : '#4B5563',
        marginTop: 14,
        marginBottom: 8,
      },
      strong: {
        fontWeight: '600',
        color: isDarkMode ? '#FFFFFF' : '#111827',
      },
      em: {
        fontStyle: 'italic',
      },
      link: {
        color: isDarkMode ? '#60A5FA' : '#2563EB',
        textDecorationLine: 'underline',
      },
      list_item: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      bullet_list: {
        marginVertical: 8,
      },
      ordered_list: {
        marginVertical: 8,
      },
      blockquote: {
        backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        borderLeftWidth: 4,
        borderLeftColor: isDarkMode ? '#4B5563' : '#9CA3AF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 12,
        borderRadius: 6,
      },
      code_inline: {
        fontFamily: 'monospace',
        backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        color: isDarkMode ? '#F59E0B' : '#D97706',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 14,
      },
      code_block: {
        fontFamily: 'monospace',
        backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        padding: 16,
        borderRadius: 8,
        marginVertical: 12,
        fontSize: 14,
        lineHeight: 20,
      },
      fence: {
        marginVertical: 12,
        padding: 16,
        backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
      },
      table: {
        borderWidth: 1,
        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
        borderRadius: 8,
        marginVertical: 16,
        overflow: 'hidden',
      },
      thead: {
        backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      },
      th: {
        padding: 12,
        borderBottomWidth: 2,
        borderBottomColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      },
      td: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
      },
      tr: {
        flexDirection: 'row',
      },
      image: {
        borderRadius: 8,
        marginVertical: 16,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      hr: {
        borderBottomWidth: 1,
        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
        marginVertical: 24,
      },
      checkbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: isDarkMode ? '#4B5563' : '#9CA3AF',
        borderRadius: 4,
        marginRight: 8,
      },
      taskList: {
        marginVertical: 8,
      },
    } as MarkdownStyles,
  });

  useEffect(() => {
    if (markdownUrl && !markdownData) {
      (async () => {
        setLoading(true);
        const fetchedMarkdown = await fetchMarkdown(markdownUrl);
        setContent(fetchedMarkdown);
        setLoading(false);
      })();
    }
  }, [markdownUrl, markdownData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? '#BB86FC' : '#6200EE'} />
      </SafeAreaView>
    );
  }

  if (!content) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load markdown content.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Markdown style={styles.markdownStyles as StyleProp<TextStyle | ViewStyle>}>{content}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarkdownViewer;
