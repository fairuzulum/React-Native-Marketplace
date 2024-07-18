import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {

  const db = getFirestore(app)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async()=>{
    setProductList([]);
    const q = query(collection(db, "UserPost"),orderBy("createdAt","desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setProductList((productList) => [...productList, doc.data()]);
    });
  }
  return (
    <View className="bg-[#fc2808] flex-1 py-8">
      <View style={{ flexDirection: "row", alignItems: "center" }} className="mt-3">
        <View style={{ flex: 1, height: 1 }} className="bg-slate-300" />
        <View>
          <Text
            style={{ width: 170, textAlign: "center" }}
            className="text-slate-50 font-bold text-[25px]"
          >
            Explore More
          </Text>
        </View>
        <View style={{ flex: 1, height: 1 }} className="bg-slate-300" />
      </View>
      <LatestItemList latestItemList={productList}/>
    </View>
  )
}