import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import { getCurrentUser } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubbmitting, setIsSubbmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields!");
      return;
    }
    setIsSubbmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User sign in successfully!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setIsSubbmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full py-2">
      <ScrollView>
        <View className="w-full justify-center px-4 h-full my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] self-center"
          />
          <Text className="text-2xl text-white text-semibold mt-7 font-psemibold text-center">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubbmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
