import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded"
      />

      <Text className="absolute bottom-1 left-1 text-white font=bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

{
  /** Positioning: relative removes from normal flow. Use bottom, left https://tailwindcss.com/docs/position#relatively-positioning-elements */
  /* mr-2 margin right for adjacent cells */
}
