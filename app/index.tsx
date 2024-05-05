import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="auto" />
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/home">Go to Home</Link>
    </View>
  );
}
