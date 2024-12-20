import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

type TableProps = {
  headers: string[];
  striped?: boolean;
  bordered?: boolean;
  theme?: 'light' | 'dark';
  children: React.ReactNode;
};

const Table: React.FC<TableProps> = ({
  headers,
  striped = true,
  bordered = true,
  theme = 'light',
  children,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = theme === 'dark' || colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 16,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#121212' : '#FFF',
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? '#37474F' : '#F1F1F1',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: bordered ? 1 : 0,
      borderColor: isDarkMode ? '#263238' : '#BDBDBD',
    },
    headerText: {
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#212121',
      fontSize: 16,
      textAlign: 'center',
      flex: 1,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: bordered ? 1 : 0,
      borderColor: isDarkMode ? '#263238' : '#BDBDBD',
    },
    stripedRow: {
      backgroundColor: isDarkMode ? '#263238' : '#F9F9F9',
    },
    tableCell: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      textAlign: 'center',
    },
    cellText: {
      color: isDarkMode ? '#E0E0E0' : '#212121',
      fontSize: 14,
    },
    border: {
      borderRightWidth: 1,
      borderColor: isDarkMode ? '#263238' : '#BDBDBD',
    },
  });

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.headerText}>
            {header}
          </Text>
        ))}
      </View>

      {/* Table Data Rows (children) */}
      {React.Children.map(children, (child, rowIndex) => {
        // If child is a table row, apply styles
        if (React.isValidElement(child) && child.type === View) {
          return (
            <View
              key={rowIndex}
              style={[styles.tableRow, striped && rowIndex % 2 === 0 && styles.stripedRow]}
            >
              {React.Children.map(child.props.children, (cell, cellIndex) => {
                return (
                  <View
                    key={cellIndex}
                    style={[styles.tableCell, cellIndex < child.props.children.length - 1 && styles.border]}
                  >
                    <Text style={styles.cellText}>{cell}</Text>
                  </View>
                );
              })}
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

export default Table;
