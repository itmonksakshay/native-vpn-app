import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "screens/HomeStackNavigator/Home";
import { LogOut } from "react-native-feather";
import Text from "components/Text";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorProps } from "./AuthStackNavigator";

type HomeStackNavigatorParams = {
  Home: undefined;
};

export type HomeStackNavigatorProps =
  NativeStackNavigationProp<HomeStackNavigatorParams>;

const Stack = createNativeStackNavigator<HomeStackNavigatorParams>();

export default function () {
  const { navigate } = useNavigation<AuthStackNavigatorProps>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <LogOut stroke="#000" onPress={() => navigate("OnBoarding")} />
          ),
          headerTitle: () => (
            <Text type="b2" style={{ fontFamily: "Poppins-Bold" }}>
              VPN
            </Text>
          ),
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
