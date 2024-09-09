import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import SignIn from "screens/AuthStackNavigator/SignIn";
import OnBoarding from "screens/AuthStackNavigator/OnBoarding";
import HomeStackNavigator from "navigation/HomeStackNavigator";

type AuthStackNavigatorParams = {
  SignIn: undefined;
  OnBoarding: undefined;
  HomeStackNavigator: undefined;
};

export type AuthStackNavigatorProps =
  NativeStackNavigationProp<AuthStackNavigatorParams>;

const Stack = createNativeStackNavigator<AuthStackNavigatorParams>();

export default function () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
    </Stack.Navigator>
  );
}
