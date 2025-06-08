import { Stack } from "expo-router";
import './globals.css';
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
export default function RootLayout() {

 const colorScheme = useColorScheme();  
   return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
 {/* Custom Header */}
      <View className="h-[40px] w-full bg-[#7518AA] justify-center items-center">
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      
      />

      
    </>
  );
}
