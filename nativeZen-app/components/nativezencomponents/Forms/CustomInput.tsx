import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomInput = ({
                         label,
                         value,
                         setValue,
                         type = "text",
                         isDarkMode = false,
                         placeholder,
                         options = [], // For checkbox and radio
                         onOptionSelect = () => {}, // Callback for checkbox and radio
                     }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setValue(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            const hours = selectedTime.getHours().toString().padStart(2, "0");
            const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
            setValue(`${hours}:${minutes}`); // Format as HH:mm
        }
    };

    const renderInput = () => {
        switch (type) {
            case "number":
                return (
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                                color: isDarkMode ? "#fff" : "#000",
                            },
                        ]}
                        value={String(value)}
                        onChangeText={setValue}
                        placeholder={placeholder}
                        placeholderTextColor={isDarkMode ? "#777" : "#999"}
                        keyboardType="numeric"
                    />
                );
            case "date":
                return (
                    <TouchableOpacity
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                                justifyContent: "center",
                            },
                        ]}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                            {value || placeholder}
                        </Text>
                    </TouchableOpacity>
                );
            case "time":
                return (
                    <TouchableOpacity
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                                justifyContent: "center",
                            },
                        ]}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                            {value || placeholder}
                        </Text>
                    </TouchableOpacity>
                );
            case "checkbox":
                return (
                    <View style={styles.checkboxContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.checkboxOption,
                                    { borderColor: isDarkMode ? "#444" : "#ccc" },
                                ]}
                                onPress={() => onOptionSelect(option.value)}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        value.includes(option.value) && styles.checkedCheckbox,
                                        { backgroundColor: isDarkMode ? "#222" : "#fff" },
                                    ]}
                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#fff" : "#000",
                                        marginLeft: 8,
                                    }}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            case "radio":
                return (
                    <View style={styles.radioContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.radioOption}
                                onPress={() => onOptionSelect(option.value)}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        {
                                            borderColor: isDarkMode ? "#444" : "#ccc",
                                            backgroundColor: value === option.value ? "#007BFF" : "transparent",
                                        },
                                    ]}
                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#fff" : "#000",
                                        marginLeft: 8,
                                    }}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            default:
                return (
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                                borderColor: isDarkMode ? "#444" : "#ccc",
                                color: isDarkMode ? "#fff" : "#000",
                            },
                        ]}
                        value={value}
                        onChangeText={setValue}
                        placeholder={placeholder}
                        placeholderTextColor={isDarkMode ? "#777" : "#999"}
                        secureTextEntry={type === "password"}
                        keyboardType={type === "email" ? "email-address" : "default"}
                    />
                );
        }
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#333" }]}>
                {label}
            </Text>
            {renderInput()}
            {showPicker && type === "date" && (
                <DateTimePicker
                    mode="date"
                    value={value ? new Date(value) : new Date()}
                    onChange={handleDateChange}
                />
            )}
            {showPicker && type === "time" && (
                <DateTimePicker
                    mode="time"
                    value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
                    onChange={handleTimeChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    checkboxContainer: {
        flexDirection: "column",
    },
    checkboxOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    checkedCheckbox: {
        backgroundColor: "#007BFF",
    },
    radioContainer: {
        flexDirection: "column",
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
});

export default CustomInput;
