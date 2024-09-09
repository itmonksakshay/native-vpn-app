import React from "react";
import {
  TouchableHighlightProps,
  TouchableOpacity,
  TextStyle,
  TextProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Text from "./Text";

interface ButtonProps extends TouchableHighlightProps {
  textStyle?: TextStyle;
  loading?: boolean;
  textProps?: TextProps;
}

export default function (props: ButtonProps) {
  const {
    children,
    textStyle,
    textProps,
    disabled = false,
    loading = false,
  } = props;

  const propsCopy = { ...props };

  propsCopy.style = [
    { backgroundColor: "#1F75FE" },
    styles.button,
    propsCopy.style,
  ];

  if (disabled || loading) {
    propsCopy.style = [propsCopy.style, styles.disabled];
  }
  propsCopy.disabled = loading || disabled;
  return (
    <TouchableOpacity style={propsCopy.style} {...propsCopy}>
      {propsCopy.loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={{
            ...styles.text,
            ...textStyle,
          }}
          {...textProps}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    textTransform: "uppercase",
  },
  disabled: {
    backgroundColor: "lightgray",
  },
});
