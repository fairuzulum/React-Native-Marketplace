import React from "react";
import Header from "../Components/HomeScreen/Header";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="px-3 py-10 bg-white flex-1">
      <Header />
    </View>
  );
}
