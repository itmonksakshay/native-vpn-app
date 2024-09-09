import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions, Image } from "react-native";
import Text from "components/Text";
import Heading from "components/Heading";

let { width } = Dimensions.get("window");
width -= 40;

type SliderProps = {
  slides: string[];
};

export default function ({ slides }: SliderProps) {
  const [active, setActive] = useState(0);
  const change = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };

  const length = slides ? slides.length * width : 0;

  return (
    <View>
      <View style={{ height: "80%" }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => change(event.nativeEvent)}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: length,
          }}
        >
          {slides.map((item, index) => (
            <View
              style={{
                width,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                paddingBottom: 6,
              }}
              key={index}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: "100%",
                  height: width,
                  maxWidth: 500,
                  maxHeight: 500,
                }}
                resizeMode="contain"
              />
              {/* <Heading style={{ marginTop: 30, marginBottom: 10 }}>
                {item.heading}
              </Heading>
              <Text type="b4" style={{ textAlign: "center" }}>
                {item.body}
              </Text> */}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.dotsContainer}>
        {slides?.map((e, index) => (
          <Text
            key={index}
            style={active == index ? styles.dotActive : styles.dot}
          >
            •
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: "15%",
    justifyContent: "space-between",
  },
  dot: {
    color: "#CCC",
    fontSize: 36,
  },
  dotActive: {
    color: "#000",
    fontSize: 36,
  },
});

/*
const slides = [
  {
    img: require("../../assets/onboarding/slider-img-1.jpg"),
    heading: "Secured Forever",
    body: "Adipisicing Lorem laboris est in commodo pariatur labore incididunt qui aliqua.",
  },
  {
    img: require("../../assets/onboarding/slider-img-2.jpg"),
    heading: "Secured Forever",
    body: "Adipisicing Lorem laboris est in commodo pariatur labore incididunt qui aliqua.",
  },
  {
    img: require("../../assets/onboarding/slider-img-3.jpg"),
    heading: "Secured Forever",
    body: "Adipisicing Lorem laboris est in commodo pariatur labore incididunt qui aliqua.",
  },
];
*/
