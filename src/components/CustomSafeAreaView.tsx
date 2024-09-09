import React from "react";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

type Props = {
  children: any;
  style?: object;
};

export default function ({ style, children }: Props) {
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: getStatusBarHeight(),
          paddingHorizontal: 20,
          paddingBottom: 40,
        },
        { ...style },
      ]}
    >
      {children}
    </View>
  );
}
