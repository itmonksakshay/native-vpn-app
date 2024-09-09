import React, { useState, useEffect, useCallback, createContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AppRegistry, Platform, View } from "react-native";
import MainStackNavigator from "navigation/MainStackNavigator";
import axios from "axios";
import config from "config/config.json";
import ImagesContext from "context/ImagesContext";
import { registerRootComponent } from "expo";
import UserContext from "context/UserContext";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [imagesURLS, setImageURLS] = useState({
    branding1: "",
    branding2: "",
    branding3: "",
    logo: "",
  });

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        const res = await axios({
          method: "get",
          url: `${config.baseurl}/vpn/branding/get`,
          headers: {
            token: `${config.token}`,
          },
        });
        const { path_homepage1, path_homepage2, path_homepage3, path_logo } =
          res.data.vpn_branding[0];
        setImageURLS({
          branding1: `${config.imageurl}/${path_homepage1}`,
          branding2: `${config.imageurl}/${path_homepage2}`,
          branding3: `${config.imageurl}/${path_homepage3}`,
          logo: `${config.imageurl}/${path_logo}`,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      onLayout={onLayoutRootView}
    >
      <ImagesContext.Provider value={imagesURLS}>
        <UserContext>
          <MainStackNavigator />
        </UserContext>
      </ImagesContext.Provider>
    </View>
  );
}

if (Platform.OS == "android") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent("vpn-app", () => App);
}
