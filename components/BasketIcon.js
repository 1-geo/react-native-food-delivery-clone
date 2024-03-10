import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  if (items.length === 0) return null;

  // to observe state
  // console.log("info - basket rendered ...");

  return (
    // set z-55 without it will not show. it will be underneath. higher ones show up
    <View className="absolute bottom-10 w-full z-10">
      <TouchableOpacity
        className="flex-row mx-5 items-center bg-[#00CCBB] p-4 rounded-lg space-x-1"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white text-lg font-extrabold text-center">
          View Basket
        </Text>
        <Text className="text-white text-lg font-extrabold text-center">
          ${basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
