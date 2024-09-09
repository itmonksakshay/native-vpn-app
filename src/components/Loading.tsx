import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

export default function Loading() {
  return (
    <Modal animationType="fade" transparent>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0, 0.2)",
          width: "100%",
          height: "100%",
        }}
      >
        <ActivityIndicator color="#000" size="large" animating={true} />
      </View>
    </Modal>
  );
}
