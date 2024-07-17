import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-react";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row gap-2">
        <Image
          source={{ uri: user.imageUrl }}
          className="rounded-full h-10 w-10"
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Welcome</Text>
          <Text className="text-[12px]">{user.fullName}</Text>
        </View>
      </View>
        <View
          style={{ marginTop: 20 }}
          className="flex flex-row items-center p-2 px-5 bg-white rounded-full border-[2px] border-blue-400"
        >
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            className="ml-2"
            placeholder="search"
            onChangeText={(value) => console.log(value)}
          />
        </View>
    </View>
  );
}
