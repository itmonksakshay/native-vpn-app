import React from "react";
import { StyleSheet, TextProps, Text } from "react-native";

interface AppProps extends TextProps {
  children: any;
  type?: "h1" | "h2" | "h3";
}

export default function Heading(props: AppProps) {
  const { type = "h2" } = props;
  const newProps = { ...props };

  newProps.style = [styles[type], newProps.style];

  return <Text {...newProps} />;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 34,
    fontFamily: "Poppins-Bold",
  },
  h2: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
  },
  h3: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
  },
});
