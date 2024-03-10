import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();

  // state
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // as screen mounts run this block. if variables in array changes refire.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // launch once when the Component Loads.
  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"] {
          ...,        
          restaurants[]->{
          ..., 
          dishes[] ->,         
          }
        }
       `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        {/**flex-1 takes majority space. like layoutWeight=1 */}
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now! </Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        {/** pushed to right */}
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/** px-4 adds horizontal padding. default it is flex-col, can use flex-row */}
      {/**Search */}
      <View className="flex-row items-center space-x-2 pb-2 max-4 px-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsIcon size={35} color="#00CCBB" />
      </View>

      {/** scrollable content */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/** Categories */}
        <Categories />

        {/** Featured row */}
        {/* dont use arrow function inside map, as it wont output result. 
        this shorthand syntax outputs ReactElement */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
