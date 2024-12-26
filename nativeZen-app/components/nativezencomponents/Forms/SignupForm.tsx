import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomInput from "./CustomInput";
import { LitUpBordersButton } from "@/components/nativezencomponents/Buttons/LitUpBordersButton";

interface SignupFormProps {
    theme?: "dark" | "light";
}

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    twitterpassword: string;
    age: string;
    birthdate: string;
    appointmentTime: string;
    preferences: string[];
    gender: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ theme = "dark" }) => {
    const [formData, setFormData] = useState<FormData>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        twitterpassword: "",
        age: "",
        birthdate: "",
        appointmentTime: "",
        preferences: [],
        gender: "",
    });

    const isDarkMode = theme === "dark";

    const handleInputChange = (key: keyof FormData, value: string | number | string[]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleOptionSelect = (key: keyof FormData, value: string) => {
        setFormData((prev) => {
            const newValue = (prev[key] as string[]).includes(value)
                ? (prev[key] as string[]).filter((item) => item !== value)
                : [...(prev[key] as string[]), value];
            return { ...prev, [key]: newValue };
        });
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

    const handleGithubLogin = () => {
        console.log("GitHub login clicked");
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login clicked");
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#333" }]}>
                Welcome to NativeZen
            </Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#bbb" : "#666" }]}>
                Login to NativeZen if you can because we don&apos;t have a login flow yet
            </Text>
            <View style={styles.form}>
                <View style={styles.row}>
                    <CustomInput
                        label="First name"
                        value={formData.firstname}
                        setValue={(value) => handleInputChange("firstname", value)}
                        type="text"
                        isDarkMode={isDarkMode}
                        placeholder="Tyler"
                    />
                    <CustomInput
                        label="Last name"
                        value={formData.lastname}
                        setValue={(value) => handleInputChange("lastname", value)}
                        type="text"
                        isDarkMode={isDarkMode}
                        placeholder="Durden"
                    />
                </View>
                <CustomInput
                    label="Email Address"
                    value={formData.email}
                    setValue={(value) => handleInputChange("email", value)}
                    type="email"
                    isDarkMode={isDarkMode}
                    placeholder="projectmayhem@fc.com"
                />
                <CustomInput
                    label="Password"
                    value={formData.password}
                    setValue={(value) => handleInputChange("password", value)}
                    type="password"
                    isDarkMode={isDarkMode}
                    placeholder="••••••••"
                />
                <CustomInput
                    label="Your Twitter Password"
                    value={formData.twitterpassword}
                    setValue={(value) => handleInputChange("twitterpassword", value)}
                    type="password"
                    isDarkMode={isDarkMode}
                    placeholder="••••••••"
                />
                <CustomInput
                    label="Age"
                    value={formData.age}
                    setValue={(value) => handleInputChange("age", value)}
                    type="number"
                    isDarkMode={isDarkMode}
                    placeholder="30"
                />
                <CustomInput
                    label="Birthdate"
                    value={formData.birthdate}
                    setValue={(value) => handleInputChange("birthdate", value)}
                    type="date"
                    isDarkMode={isDarkMode}
                    placeholder="YYYY-MM-DD"
                />
                <CustomInput
                    label="Appointment Time"
                    value={formData.appointmentTime}
                    setValue={(value) => handleInputChange("appointmentTime", value)}
                    type="time"
                    isDarkMode={isDarkMode}
                    placeholder="HH:MM"
                />
                <CustomInput
                    label="Preferences"
                    value={formData.preferences}
                    setValue={(value) => handleInputChange("preferences", value)}
                    type="checkbox"
                    isDarkMode={isDarkMode}
                    options={[
                        { label: "Option 1", value: "option1" },
                        { label: "Option 2", value: "option2" },
                    ]}
                    onOptionSelect={(value) => handleOptionSelect("preferences", value)}
                />
                <CustomInput
                    label="Gender"
                    value={formData.gender}
                    setValue={(value) => handleInputChange("gender", value)}
                    type="radio"
                    isDarkMode={isDarkMode}
                    options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ]}
                    onOptionSelect={(value) => handleInputChange("gender", value)}
                />

                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: isDarkMode ? "#333" : "#000" }]}
                    onPress={handleSubmit}
                >
                    <Text style={[styles.submitButtonText, { color: isDarkMode ? "#fff" : "#fff" }]}>
                        Sign up →
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.orText, { color: isDarkMode ? "#bbb" : "#666" }]}>
                    OR
                </Text>

                <LitUpBordersButton onPress={handleGoogleLogin} text={"Sign in with Google"} />
                <LitUpBordersButton onPress={handleGithubLogin} text={"Sign in with Github"} />
                <LitUpBordersButton onPress={handleFacebookLogin} text={"Sign in with Facebook"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 16,
    },
    form: {
        marginTop: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    submitButton: {
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 16,
    },
    submitButtonText: {
        fontWeight: "bold",
    },
    orText: {
        textAlign: "center",
        marginVertical: 12,
        fontSize: 16,
    },
});