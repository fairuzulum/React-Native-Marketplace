import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Categories({ categoryList }) {
  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-semibold text-[20px] text-slate-50">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          className="flex-1 items-center justify-center p-2 border-[1px] border-[#fc2808] m-1 rounded-lg bg-white"
          onPress={() => navigation.navigate("item-list", { category: item.name })}
          >
            <Image source={{ uri: item.icon }} className="h-[40px] w-[40px]" />
            <Text className="text-[10px] mt-1">{item.name} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
