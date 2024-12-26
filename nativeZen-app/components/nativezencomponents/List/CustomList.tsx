import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { Ionicons } from "@expo/vector-icons";

interface ListItem {
    id: string;
    value: string;
}

interface CustomListProps {
    data: ListItem[];
    renderItemContent?: (item: ListItem) => JSX.Element;
    onAddItem?: (updatedData: ListItem[]) => void;
    onDeleteItem?: (updatedData: ListItem[]) => void;
    onEditItem?: (updatedData: ListItem[]) => void;
    onReorder?: (updatedData: ListItem[]) => void;
    isDarkMode?: boolean;
    placeholder?: string;
    addButtonText?: string;
}

const CustomList: React.FC<CustomListProps> = ({
                                                   data,
                                                   renderItemContent,
                                                   onAddItem,
                                                   onDeleteItem,
                                                   onEditItem,
                                                   onReorder,
                                                   isDarkMode = false,
                                                   placeholder = "Add new item",
                                                   addButtonText = "Add",
                                               }) => {
    const [listData, setListData] = useState<ListItem[]>(data);
    const [newItem, setNewItem] = useState<string>("");
    const [editItem, setEditItem] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const handleAddItem = () => {
        if (newItem.trim()) {
            const updatedData = [...listData, { id: Date.now().toString(), value: newItem }];
            setListData(updatedData);
            setNewItem("");
            onAddItem && onAddItem(updatedData);
        }
    };

    const handleDeleteItem = (id: string) => {
        const updatedData = listData.filter((item) => item.id !== id);
        setListData(updatedData);
        onDeleteItem && onDeleteItem(updatedData);
    };

    const handleEditItem = (id: string) => {
        const updatedData = listData.map((item) =>
            item.id === id ? { ...item, value: editValue } : item
        );
        setListData(updatedData);
        setEditItem(null);
        setEditValue("");
        onEditItem && onEditItem(updatedData);
    };

    const handleReorder = (updatedData: ListItem[]) => {
        setListData(updatedData);
        onReorder && onReorder(updatedData);
    };

    const defaultRenderItem = ({
                                   item,
                                   drag,
                                   isActive,
                               }: RenderItemParams<ListItem>) => (
        <View
            style={[
                styles.listItem,
                {
                    backgroundColor: isDarkMode
                        ? isActive
                            ? "#333"
                            : "#444"
                        : isActive
                            ? "#ddd"
                            : "#f9f9f9",
                    borderColor: isDarkMode ? "#666" : "#ccc",
                },
            ]}
        >
            {editItem === item.id ? (
                <>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
                                color: isDarkMode ? "#fff" : "#000",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                                flex: 1,
                            },
                        ]}
                        value={editValue}
                        onChangeText={setEditValue}
                        placeholder="Edit item"
                        placeholderTextColor={isDarkMode ? "#777" : "#999"}
                    />
                    <TouchableOpacity onPress={() => handleEditItem(item.id)}>
                        <Ionicons name="checkmark" size={20} color={isDarkMode ? "#0f0" : "#007BFF"} />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={{ flex: 1 }} onLongPress={drag} delayLongPress={1500}>
                        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                            {renderItemContent ? renderItemContent(item) : item.value}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEditItem(item.id) || setEditValue(item.value)}>
                        <Ionicons name="pencil" size={20} color={isDarkMode ? "#ffc107" : "#ff9800"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                        <Ionicons name="trash" size={20} color={isDarkMode ? "#ff6b6b" : "#ff0000"} />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? "#222" : "#fff" }]}>
                <DraggableFlatList
                    data={listData}
                    renderItem={defaultRenderItem}
                    keyExtractor={(item) => item.id}
                    onDragEnd={({ data }) => handleReorder(data)}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
                                color: isDarkMode ? "#fff" : "#000",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                            },
                        ]}
                        value={newItem}
                        onChangeText={setNewItem}
                        placeholder={placeholder}
                        placeholderTextColor={isDarkMode ? "#777" : "#999"}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={{ color: "#fff" }}>{addButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: Dimensions.get("window").width-50,
        height: Dimensions.get("window").height/2,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
    },
    inputContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    addButton: {
        backgroundColor: "#007BFF",
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
});

export default CustomList;
