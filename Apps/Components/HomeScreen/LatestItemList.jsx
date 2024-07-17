import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function LatestItemList({latestItemList}) {
  return (
    <View className="mt-3 mb-10">
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
      data={latestItemList}
      numColumns={2}
      renderItem={({ item, index })=>(
        <View className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200 bg-white">
          <Image
          source={{ uri:item.image }}
          className="w-[60px] h-[60px] rounded-full"
          />
          
          <View>
            <Text className="text-[15px] text-slate-600 font-bold mt-2">{item.title}</Text>
            <Text className="text-[13px] font-bold text-slate-600">Rp.{item.price}</Text>
            <Text className="text-[11px] text-slate-600">{item.desc}</Text>
          </View>
        </View> 
      )}
      
      />
    </View>
  )
}