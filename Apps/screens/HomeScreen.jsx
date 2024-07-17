import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import { View } from "react-native";
import Slider from "../Components/HomeScreen/Slider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Categories from "../Components/HomeScreen/Categories";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] =useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
  }, []);   


  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList(sliderList => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View className="px-3 py-10 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
    </View>
  );
}
