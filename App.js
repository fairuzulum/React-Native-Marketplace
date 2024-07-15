import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "nativewind";
import LoginScreen from "./Apps/screens/LoginScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZWxlY3RyaWMtZG9kby04Mi5jbGVyay5hY2NvdW50cy5kZXYk">
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />

        <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
