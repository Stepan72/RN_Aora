import { View, Text, FlatList } from "react-native";
import React from "react";
import { TrendingProps } from "../types";

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      horizontal
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
    />
  );
};

export default Trending;
