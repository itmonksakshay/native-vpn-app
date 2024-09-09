import React, { useEffect, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ArrowRight, Check } from "react-native-feather";

type AnimationButtonProps = {
  activated: boolean;
  handlePress: Function;
  loading: boolean;
};

export default function ({
  activated,
  handlePress,
  loading,
}: AnimationButtonProps) {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (activated) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [activated]);

  const firstLayerStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#696969", "#1F75FE"],
    }),
  };
  const secondLayerStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(128,128,128, 1)", "rgba(0,0,0,0.4)"],
    }),
  };
  const thirdLayerStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#A9A9A9", "#1F75FE"],
    }),
  };
  const buttonStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#1F75FE", "#fff"],
    }),
    borderColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#1F75FE", "#000"],
    }),
  };
  const textStyle = {
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#fff", "#000"],
    }),
  };
  return (
    <View>
      <Animated.View style={[styles.containerButton, firstLayerStyle]}>
        <Animated.View style={[styles.darkCircle, secondLayerStyle]}>
          <Animated.View style={[styles.blueCircle, thirdLayerStyle]}>
            {activated ? (
              <Check stroke="#fff" width={60} height={60} />
            ) : (
              <ArrowRight stroke="#fff" width={60} height={60} />
            )}
          </Animated.View>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.button, buttonStyle]}>
        {loading ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color="#000" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handlePress()}
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.Text style={[styles.text, textStyle]}>
              {activated ? "DISCONNECT" : "CONNECT NOW"}
            </Animated.Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    width: "60%",
    maxWidth: 400,
    maxHeight: 400,
    aspectRatio: 1,
    borderRadius: 400,
    padding: 12,
    marginVertical: 25,
  },
  darkCircle: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 400,
    padding: 12,
  },
  blueCircle: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 40,
    alignSelf: "center",
    borderWidth: 1,
  },
  text: {
    fontFamily: "Poppins-Bold",
  },
});
