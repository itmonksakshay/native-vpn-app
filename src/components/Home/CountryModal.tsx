import Text from "components/Text";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

export default function CountryModal() {
  const [modalVisibile, toggleModal] = useState(false);
  const [modalVisibileComplete, setModalVisibleComplete] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  function handleModalPress() {
    bottomSheetRef.current?.expand();
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleModalPress}>
        <Text style={styles.text}>Flag</Text>
        <Text style={styles.text}>New York,NY</Text>
      </TouchableOpacity>
      {/* <Modal
          visible={modalVisibile}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setModalVisibleComplete(false);
          }}
          onShow={() => setModalVisibleComplete(true)}
        >
          <Pressable
            style={{
              backgroundColor: modalVisibileComplete
                ? "rgba(0,0,0,0.4)"
                : "transparent",
              flex: 1,
            }}
            onPress={() => {
              toggleModal(false);
              setModalVisibleComplete(false);
            }}
          />
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.text}>Flag</Text>
              <Text style={styles.text}>New York,NY</Text>
            </View>
          </View>
        </Modal> */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["55%", "70%"]}
        containerStyle={{ flex: 1, backgroundColor: "#000", height: "100%" }}
      >
        <BottomSheetScrollView contentContainerStyle={{ flex: 1 }}>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text: {
    fontSize: 14,
  },

  modalContainer: {
    justifyContent: "flex-end",
    width: "100%",
    height: "40%",
    backgroundColor: "#fff",
    marginTop: "auto",
  },

  modalBackground: {
    backgroundColor: "transparent",
    flex: 1,
  },
});
