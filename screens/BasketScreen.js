import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const actionDispatcher = useDispatch();

  // recompute when items change
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      // iterate thru items
      // get the array if not create emplty one. push in
      // result is map with id,[]
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  // console.log(groupedItemsInBasket);

  return (
    // parents are flex-1, allows ScrollView to get expand to full available size.
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-100">
        {/* Top bar */}
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="absolute top-3 right-5 rounded-full bg-gray-100"
            onPress={navigation.goBack}
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 mins</Text>
          <TouchableOpacity className="text-[#00CCBB]">
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Inside return implicitly to render the UI */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row bg-white items-center space-x-2 px-5 py-2"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">${items[0]?.price}</Text>
              <TouchableOpacity
                onPress={() => actionDispatcher(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Content */}
        <View className="bg-white p-5 mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${basketTotal}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$5.99</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">${basketTotal + 5.99}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PrepareOrderScreen")}
            className="bg-[#00CCBB] rounded-lg p-4"
          >
            <Text className="text-white text-lg text-center font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>

        {/*  */}
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
