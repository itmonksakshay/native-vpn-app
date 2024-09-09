import React, { useContext, useEffect, useState } from "react";
import CustomSafeAreaView from "components/CustomSafeAreaView";
import Slider from "components/OnBoarding/Slider";
import Button from "components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorProps } from "navigation/AuthStackNavigator";
import axios from "axios";
import config from "config/config.json";
import ImagesContext from "context/ImagesContext";

export default function () {
  const { navigate } = useNavigation<AuthStackNavigatorProps>();
  const { branding1, branding2, branding3 } = useContext(ImagesContext);

  const imagesSlides = [branding1, branding2, branding3];

  return (
    <CustomSafeAreaView
      style={{ backgroundColor: "#fff", justifyContent: "space-between" }}
    >
      <Slider slides={imagesSlides} />
      <Button onPress={() => navigate("SignIn")}>Get Started</Button>
    </CustomSafeAreaView>
  );
}
