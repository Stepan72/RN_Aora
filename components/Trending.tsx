import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";
import React, { useState } from "react";
import { TrendingProps, TrendingItemProps } from "../types";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
} as Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>;

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
} as Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>;

const TrendingItem = ({
  title,
  thumbnail,
  prompt,
  //   video,
  creator,
  activeItemId,
  $id,
}: TrendingItemProps) => {
  const video = "https://rutube.ru/video/75aa0eda76d3f0b6e778a2aced278a51/";
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItemId === $id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-52 h-72 rounded-[35px] mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItemId, setActiveItemId] = useState(posts[0]?.$id);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      horizontal
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveItemId(viewableItems[0].key);
        }
      }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      renderItem={({ item }) => (
        <TrendingItem activeItemId={activeItemId} {...item} />
      )}
    />
  );
};

export default Trending;
