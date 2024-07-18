import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetail() {
  const { params } = useRoute();
  const [product, setProduct] = useState({});
  const navigation = useNavigation();
  const [latestItemList, setLatestItemList] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    params && setProduct(params.product);
    getLatestItemList();
    shareButton();
  }, [params, navigation]);

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const sendEmailMessage = () => {
    const subject = "Interested in your product";
    const image = encodeURIComponent(product.image);
    const body =
      image +
      "\n\n Hi " +
      product.userName +
      ", I am interested in your product " +
      product.title +
      ". Please let me know more details about this product." +
      "\n\n" +
      "Thanks";
    Linking.openURL(
      "mailto:" + product.userEmail + "?subject=" + subject + "&body=" + body
    );
  };

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          onPress={() => shareProduct()}
          size={24}
          color="white"
          style={{ marginRight: 8 }}
        />
      ),
    });
  };

  const shareProduct = async () => {
    const content = {
      message: product.image + "\n\n" + "Rp" + numberFormat(product.price) + "\n"  + product.title + "\n" + product.desc,
    };
    Share.share(content).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      <Image source={{ uri: product.image }} className="h-[320px] w-full" />

      <View className="p-2 w-[340px]">
        <Text className="font-bold text-[#fc2808]">
          Rp
          <Text className="text-[26px] text-[#fc2808] font-bold">
            {numberFormat(product.price)}
          </Text>
        </Text>

        <Text className="text-[16px] text-slate-900">{product.title}</Text>
        <TouchableOpacity
          className="border-[1px] p-1 rounded-full bg-[#fc2808] border-slate-50 w-[70px] items-center"
          onPress={() =>
            navigation.navigate("item-list", { category: product.category })
          }
        >
          <Text className="text-slate-50 text-[10px] font-semibold">
            {product.category}
          </Text>
        </TouchableOpacity>

        <Text className="text-[17px] font-bold text-slate-500 mt-3">
          Description
        </Text>
        <Text className="text-[14px] ">{product.desc}</Text>

        <View className="flex flex-row items-center">
          <View className="bg-slate-400 mt-2 flex-1 h-[1px]" />
        </View>

        <View className="flex flex-row gap-2 mt-2 mb-3">
          <Image
            source={{ uri: product.userImage }}
            className="rounded-full h-10 w-10"
          />
          <View>
            <Text className="text-[14px] font-bold">{product.userName}</Text>
            <Text className="text-[12px]">{product.userEmail}</Text>
          </View>
          <TouchableOpacity
            className="border-[1px] p-1 rounded-lg bg-white border-[#fc2808] w-[120px] items-center"
            onPress={() => sendEmailMessage()}
          >
            <AntDesign name="message1" size={20} color="#fc2808" />
            <Text className="text-[#fc2808] text-[10px] font-semibold">
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1 }} className="bg-slate-300" />
        <View>
          <Text
            style={{ width: 120, textAlign: "center" }}
            className="text-slate-800"
          >
            Another Product
          </Text>
        </View>
        <View style={{ flex: 1, height: 1 }} className="bg-slate-300" />
      </View>
      <View className="bg-slate-50">
        <LatestItemList latestItemList={latestItemList.slice(0,4)} />
      </View>
    </ScrollView>
  );
}
