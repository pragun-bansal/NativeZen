import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from "react-native";
import {LitUpBordersButton} from "@/components/nativezencomponents/Buttons/LitUpBordersButton";

export function SignupForm({theme="dark"}) {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        twitterpassword: "",
    });

    const isDarkMode = theme === "dark";

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
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
    }

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? "#000" : "#fff" },
            ]}
        >
            <Text
                style={[
                    styles.title,
                    { color: isDarkMode ? "#fff" : "#333" },
                ]}
            >
                Welcome to NativeZen
            </Text>
            <Text
                style={[
                    styles.subtitle,
                    { color: isDarkMode ? "#bbb" : "#666" },
                ]}
            >
                Login to NativeZen if you can because we don&apos;t have a login flow
                yet
            </Text>
            <View style={styles.form}>
                <View style={styles.row}>
                    <LabelInputContainer
                        label="First name"
                        value={formData.firstname}
                        onChangeText={(value) => handleInputChange("firstname", value)}
                        placeholder="Tyler"
                        isDarkMode={isDarkMode}
                    />
                    <LabelInputContainer
                        label="Last name"
                        value={formData.lastname}
                        onChangeText={(value) => handleInputChange("lastname", value)}
                        placeholder="Durden"
                        isDarkMode={isDarkMode}
                    />
                </View>
                <LabelInputContainer
                    label="Email Address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    placeholder="projectmayhem@fc.com"
                    isDarkMode={isDarkMode}
                />
                <LabelInputContainer
                    label="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange("password", value)}
                    placeholder="••••••••"
                    secureTextEntry
                    isDarkMode={isDarkMode}
                />
                <LabelInputContainer
                    label="Your Twitter Password"
                    value={formData.twitterpassword}
                    onChangeText={(value) => handleInputChange("twitterpassword", value)}
                    placeholder="••••••••"
                    secureTextEntry
                    isDarkMode={isDarkMode}
                />

                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        { backgroundColor: isDarkMode ? "#333" : "#000" },
                    ]}
                    onPress={handleSubmit}
                >
                    <Text
                        style={[
                            styles.submitButtonText,
                            { color: isDarkMode ? "#fff" : "#fff" },
                        ]}
                    >
                        Sign up →
                    </Text>
                </TouchableOpacity>

                <Text
                    style={[
                        styles.orText,
                        { color: isDarkMode ? "#bbb" : "#666" },
                    ]}
                >
                    OR
                </Text>

                {/*<TouchableOpacity*/}
                {/*    style={[*/}
                {/*        styles.socialButton,*/}
                {/*        { backgroundColor: isDarkMode ? "#4285F4" : "#4285F4" },*/}
                {/*    ]}*/}
                {/*    onPress={handleGoogleLogin}*/}
                {/*>*/}
                {/*    <Text style={styles.socialButtonText}>Sign in with Google</Text>*/}
                {/*</TouchableOpacity>*/}

                <LitUpBordersButton onPress={handleGoogleLogin} text={"Sign in with Google"}/>
                <LitUpBordersButton onPress={handleGithubLogin} text={"Sign in with Github"}/>
                <LitUpBordersButton onPress={handleFacebookLogin} text={"Sign in with Facebook"}/>
            </View>
        </View>
    );
}

const LabelInputContainer = ({
                                 label,
                                 value,
                                 onChangeText,
                                 placeholder,
                                 secureTextEntry,
                                 isDarkMode,
                             }) => (
    <View style={styles.inputContainer}>
        <Text
            style={[
                styles.label,
                { color: isDarkMode ? "#fff" : "#333" },
            ]}
        >
            {label}
        </Text>
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
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={isDarkMode ? "#777" : "#999"}
            secureTextEntry={secureTextEntry}
        />
    </View>
);

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
    inputContainer: {
        marginBottom: 12,
        flex: 1,
        marginHorizontal: 4,
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
    socialButton: {
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 8,
    },
    socialButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
