import MarkdownViewer from '@/components/nativezencomponents/Markdown';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
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
  return (
    <MarkdownViewer markdownData={copy} />
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '', // Add a background color for visibility
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16, // Add padding for better readability
  },
  markdown: {
    body: {
      fontSize: 16,
      color: '#333333', // Set text color
    },
    heading1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111111',
    },
    strong: {
      fontWeight: 'bold',
      color: '#000000',
    },
  },
});
