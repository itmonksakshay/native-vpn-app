import React, { useContext, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import CustomSafeAreaView from "components/CustomSafeAreaView";
import Heading from "components/Heading";
import TextInput from "components/TextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorProps } from "navigation/AuthStackNavigator";
import axios from "axios";
import config from "config/config.json";
import Text from "components/Text";
import { UserContext, UserContextType } from "context/UserContext";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation<AuthStackNavigatorProps>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserId } = useContext(UserContext) as UserContextType;

  async function handleSignIn() {
    if (!email || !password) return setError("Invalid Credentials");
    setLoading(true);
    const body = {
      username: email,
      password,
    };


    try {
      const res = await axios({
        method: "post",
        url: `${config.baseurl}/customer/check`,
        data: JSON.stringify(body),
        headers: {
          token: config.token,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.success) {
        setError("");
        setUserId(res.data.user.id.toString());
        navigate("HomeStackNavigator");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CustomSafeAreaView style={{ backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "space-between",
          flex: 1,
        }}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={require("../../assets/onboarding/slider-img-2.jpg")}
            style={{
              width: "100%",
              height: "50%",
              alignSelf: "center",
              resizeMode: "contain",
            }}
          />
          <Heading type="h1">Sign In</Heading>
          <View style={{ height: 30, justifyContent: "center" }}>
            {error ? (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {error}
              </Text>
            ) : null}
          </View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Username"
            style={{ marginBottom: 20 }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        style={{
          position: "absolute",
          width: "100%",
          bottom: "5%",
          alignSelf: "center",
        }}
        onPress={handleSignIn}
        loading={loading}
      >
        Sign In
      </Button>
    </CustomSafeAreaView>
  );
}
