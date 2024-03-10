import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { XIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="z-50">
        {/* Top Content */}
        <View className="flex-row justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white rounded-md mx-5 my-2 p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar indeterminate={true} size={30} color="#00CCBB" />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      {/* Map, content inside SafeAreaView starts below. This content starts higher. Hence z value on SafeAreaView puts it on top of MapView */}
      <MapView className="flex-1 z-0 -mt-12" mapType="mutedStandard" />

      <View className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 rounded-full ml-5 p-4"
        />
        <View className="flex-1">
          <Text className="text-lg">Sonny</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
