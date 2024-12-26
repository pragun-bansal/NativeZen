import React, { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import CustomList from "./CustomList";

const DemoList = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const initialData = [
        { id: "1", value: "Item 1" },
        { id: "2", value: "Item 2" },
        { id: "3", value: "Item 3" },
    ];

    const handleAddItem = (updatedData) => {
        console.log("Item added:", updatedData);
    };

    const handleDeleteItem = (updatedData) => {
        console.log("Item deleted:", updatedData);
    };

    const handleEditItem = (updatedData) => {
        console.log("Item edited:", updatedData);
    };

    const handleReorder = (updatedData) => {
        console.log("Items reordered:", updatedData);
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? "#222" : "#f9f9f9" },
            ]}
        >
            <View style={styles.header}>
                <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 18 }}>
                    Toggle Dark Mode
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={() => setIsDarkMode((prev) => !prev)}
                />
            </View>

            <CustomList
                data={initialData}
                isDarkMode={isDarkMode}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onEditItem={handleEditItem}
                onReorder={handleReorder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
});

export default DemoList;
