import React from "react";
import { Dimensions, View, ViewProps } from "react-native";

export default function ScreenOverlay(props: ViewProps) {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 10,
        },
        props,
      ]}
    />
  );
}
