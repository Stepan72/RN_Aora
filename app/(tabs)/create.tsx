import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { CreateFormStateProps } from "../../types";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState<CreateFormStateProps>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm((prevValue) => ({ ...prevValue, thumbnail: result.assets[0] }));
      }
      if (selectType === "video") {
        setForm((prevValue) => ({ ...prevValue, video: result.assets[0] }));
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }
    setIsUploading(true);

    try {
      await createVideo({ ...form, creator: user?.$id });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("home");
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setIsUploading(false);
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title"
          handleChangeText={(e) =>
            setForm((prevValue) => ({ ...prevValue, title: e }))
          }
          otherStyles="mt-6"
        />
        <View className="mt-4 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-4 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used"
          handleChangeText={(e) =>
            setForm((prevValue) => ({ ...prevValue, prompt: e }))
          }
          otherStyles="mt-4"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={handleSubmit}
          containerStyles="mt-4"
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

/// 3:53
