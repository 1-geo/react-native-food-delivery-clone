import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PrepareOrderScreen = () => {
  const navigation = useNavigation();

  // after timeout go to delivery screen
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] justify-center items-center">
      <Animatable.Image
        source={require("../assets/waitingOnOrder.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96 rounded-sm"
      />

      <Animatable.Text
        animation="slideInUp"
        className="mt-12 text-lg text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your Order!
      </Animatable.Text>

      <Progress.Circle
        className="mt-8"
        size={60}
        indeterminate={true}
        color="white"
      />
    </SafeAreaView>
  );
};

export default PrepareOrderScreen;
