import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LatestItemList({ latestItemList, heading }) {
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <View className="mt-3 mb-10">
      <Text className="font-semibold text-[20px] text-slate-50">{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <PostItem item={item} numberFormat={numberFormat} />
        )}
      />
    </View>
  );
}
