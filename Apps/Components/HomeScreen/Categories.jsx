import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Categories({ categoryList }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex-1 items-center justify-center p-2 border-[1px] border-gray-300 m-1 rounded-lg">
            <Image
              source={{ uri: item.icon }}
              className="h-[40px] w-[40px]"
            />
            <Text className="text-[10px] mt-1">{item.name} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}