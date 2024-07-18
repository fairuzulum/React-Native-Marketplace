import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params && getItemListByCategory();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [params]);

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(
      collection(db, "UserPost"),
      where("category", "==", params.category)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setItemList((itemList) => [...itemList, doc.data()]);
    });
  };

  return (
    <View>
      {loading ? (
        <View className="flex h-screen">
          <View className="m-auto">
            <Text className="mb-20 text-[20px] font-bold text-slate-500">
              <ActivityIndicator size="large" color="#fc2808" />
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {itemList.length > 0 ? (
            <LatestItemList latestItemList={itemList} heading={""} />
          ) : (
            <View className="flex h-screen">
              <View className="m-auto">
                <Text className="mb-20 text-[20px] font-bold text-slate-500">
                  Post Not Found...
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
