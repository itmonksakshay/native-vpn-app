import React from "react";
import { StyleSheet, Text as NativeText, TextProps } from "react-native";

interface AppProps extends TextProps {
  children: any;
  type?: "b1" | "b2" | "b3" | "b4";
}

export default function (props: AppProps) {
  const { type = "b2" } = props;
  const newProps = { ...props };

  newProps.style = [styles[type], newProps.style];
  return <NativeText {...newProps}>{props.children}</NativeText>;
}

const styles = StyleSheet.create({
  b1: {
    fontSize: 22,
    fontFamily: "Poppins-Regular",
  },
  b2: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  b3: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  b4: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
});
