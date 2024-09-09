import React, { useState } from "react";
import {
  TextInputProps,
  TextInput as NativeTextInput,
  View,
  StyleSheet,
} from "react-native";
import { Eye, EyeOff } from "react-native-feather";

export default function TextInput(props: TextInputProps) {
  const { textContentType, style } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  const showPassword = passwordVisible || textContentType != "password";
  const isPasswordField = textContentType == "password";

  const containerFocus = {
    borderColor: "#1F75FE",
    borderWidth: 3,
  };

  function EyeIcon() {
    if (showPassword)
      return <Eye color="black" onPress={() => setPasswordVisible(false)} />;
    return <EyeOff color="black" onPress={() => setPasswordVisible(true)} />;
  }

  return (
    <View style={[styles.container, focus ? containerFocus : null, style]}>
      <NativeTextInput
        secureTextEntry={!showPassword}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
        style={[styles.input]}
      />
      {isPasswordField ? <EyeIcon /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  input: {
    flex: 1,
    fontSize: 20,
  },
});
