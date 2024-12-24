import React from "react";
import {View, Text, ScrollView} from "react-native";
import {SignupForm} from "@/components/nativezencomponents/Forms/SignupForm";

export default function form() {
    return (
        <ScrollView className="bg-black">
            <SignupForm />
        </ScrollView>
    );

}

