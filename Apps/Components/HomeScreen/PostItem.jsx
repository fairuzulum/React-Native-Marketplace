import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({item, numberFormat }) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-[#fc2808] bg-white"
    onPress={()=>navigation.push("product-detail", {
        product: item
    })}
    >
      <View className="flex flex-row gap-2">
        <Image
          source={{ uri: item.image }}
          className="w-[60px] h-[60px] rounded-full"
        />
        <View className="py-4">
          <Text className="bg-[#fc2808] font-bold text-slate-50 rounded-lg py-1 text-center text-[12px] w-[65px] h-[27px]">
            {item.category}
          
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-[15px] text-slate-600 mt-2">
          {item.title}
        </Text>
        <Text className="text-[13px] font-semibold text-slate-600">
          Rp.{numberFormat(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
