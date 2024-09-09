import Text from "components/Text";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Check } from "react-native-feather";

type CountryItemProps = {
  flag: string;
  name: string;
  selectedCountry: string;
  vpnType:string;
  setSelectedCountry: (country: {
    name: string;
    flag: string;
    server_id: string;
    vpnType:string;
  }) => void;
  server_id: string;
};

export default function CountryItem({
  flag,
  name,
  selectedCountry,
  setSelectedCountry,
  server_id,
  vpnType
}: CountryItemProps) {

  return (
    <TouchableOpacity
      style={styles.countryButton}
      onPress={() => setSelectedCountry({ name, flag, server_id,vpnType})}
    >
      <Image source={{ uri: flag }} style={styles.countryImage} />
      <Text style={{ fontSize: 16, flex: 1 }}>{name}</Text>
      <View
        style={[
          styles.checkedButton,
          selectedCountry === name
            ? { backgroundColor: "#1F75FE" }
            : { backgroundColor: "#fff" },
        ]}
      >
        <Check color="#fff" width={14} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  countryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    padding: 8,
  },
  countryImage: {
    width: 26,
    aspectRatio: 1,
    marginRight: 20,
  },
  checkedButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
