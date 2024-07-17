import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import { View } from "react-native";
import Slider from "../Components/HomeScreen/Slider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] =useState([]);

  useEffect(() => {
    getSliders();
  }, []);   


  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList(sliderList => [...sliderList, doc.data()]);
    });
  };
  return (
    <View className="px-3 py-10 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList} />
    </View>
  );
}
