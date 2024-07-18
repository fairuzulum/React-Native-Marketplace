import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } 
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
  return (
    <View>
      <Image
        source={require("./../../assets/images/home.png")}
        className="w-full h-[350px] object-cover"
      />
      <View className="p-8 mt-[-50] rounded-t-3xl">
        <Text className="text-[30px] font-bold text-[#fc2808]">Void Marketplace</Text>
        <Text className="text-slate-600 text-[16px] font-semibold">
          Tempat belanja online no.1 di Indonesia
        </Text>
        <Image
          source={require("./../../assets/images/bag.png")}
          className='w-[300px] h-[300px]'
        />
        <TouchableOpacity onPress={onPress} className="p-3 bg-[#fc2808] rounded-full">
          <Text className="text-slate-50 text-center font-semibold text-[18px]">Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
