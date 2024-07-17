import { View, FlatList, Image } from "react-native";
import React from "react";

export default function Slider({ sliderList }) {
  return (
    <View className="mt-3">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item.image }}
              className="h-[160px] w-[290px] mr-3 rounded-lg object-contain"
            />
          </View>
        )}
      />
    </View>
  );
}
