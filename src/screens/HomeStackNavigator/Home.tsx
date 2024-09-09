import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import CustomSafeAreaView from "components/CustomSafeAreaView";
import AnimationButton from "components/Home/AnimationButton";
import Text from "components/Text";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, DeviceEventEmitter, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ChevronDown } from "react-native-feather";
import CountryItem from "components/Home/CountryItem";
import RNSimpleOpenvpn, {
  addVpnStateListener,
} from "react-native-simple-openvpn";
import { useNavigation } from "@react-navigation/native";
import { LogOut } from "react-native-feather";
import { AuthStackNavigatorProps } from "navigation/AuthStackNavigator";
import axios from "axios";
import config from "config/config.json";
import Loading from "components/Loading";
import ImagesContext from "context/ImagesContext";
import { UserContext, UserContextType } from "context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNWireguard from 'react-native-vpn-testing-only';



type CountriesType = {
  flag: string;
  name: string;
  server_id: string;
  vpn_type: string;
};

export default function () {
  const STATUS_VPN = "STATUS_VPN";

  const [statusVPN, setStatusVPN] = useState("false");
  const [modalOpened, toggleModalOpened] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "",
    name: "",
    server_id: "",
    vpn_type: ""
  });
  const [countries, setCountries] = useState<CountriesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { logo } = useContext(ImagesContext);
  const { userId } = useContext(UserContext) as UserContextType;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { setOptions, navigate } = useNavigation<AuthStackNavigatorProps>();

  let flag = false;

  async function fetchCountries() {
    const res = await axios({
      url: `${config.baseurl}/vpn/servers/list`,
      method: "get",
      headers: {
        token: `${config.token}`,
      },
    });
    if (res.data.success) {
      const countriesData = res.data.vpn_systems.map((item: any) => {
        return {
          name: item.server_name,
          flag: `${config.imageurl}/flags/${item.flag_countries}.png`,
          server_id: item.id,
          vpn_type: item.vpn_type
        };
      });
      setSelectedCountry(countriesData[0]);
      setCountries(countriesData);
    }
  }

  async function setInitialStatus() {
    const status = await AsyncStorage.getItem(STATUS_VPN);
    if (status) setStatusVPN(status);
    else setStatusVPN("false");
  }

  useEffect(() => {
    setLoading(true);
    fetchCountries();
    setOptions({
      headerRight: () => (
        <LogOut
          stroke="#000"
          onPress={() => {
            toggleModalOpened(false);
            navigate("OnBoarding");
          }}
        />
      ),
      headerTitle: () => (
        <Image
          source={{ uri: logo }}
          style={{ width: 30, aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      headerTitleAlign: "center",
    });
    setInitialStatus();
    setLoading(false);
  }, []);

  useEffect(()=>{

    DeviceEventEmitter.addListener(RNWireguard.EV_TYPE_SYSTEM, (e) => {

      console.log(e,"EV_STARTED_BY_SYSTEM")
      if(e === RNWireguard.EV_STARTED_BY_SYSTEM) {
        // This event is emitted when VPN service is started
              // by the system. For example if a user enables Always-On
              // in settings, system will try to bring the VPN online but
              // since it doesn't have any config it will fail and send
              // this event instead so that you can start it correctly
              // here...
      }
      });
  
      // If any exceptions occur after calling the Connect()
      // method you can catch them here. e is of type string
      DeviceEventEmitter.addListener(RNWireguard.EV_TYPE_EXCEPTION, (e) => {
      console.log(e,'EV_TYPE_EXCEPTION, ConnectConnect');
      });
  
      DeviceEventEmitter.addListener(RNWireguard.EV_TYPE_REGULAR, (e) => {
        console.log(e,'EV_TYPE_REGULAR')
          if(e === RNWireguard.EV_STOPPED) {
              // Update state
      } else if(e === RNWireguard.EV_STARTED) {
        // Update state
      }
      });

    return () =>{
      DeviceEventEmitter.removeAllListeners();
    }
  },[])

  addVpnStateListener((e) => {
    if (flag && e.message === "NOPROCESS") {
      handleDisconnection();
      flag = false;
    }
  });

  async function handleDisconnection() {
    const vpnData = {
      user_id: parseInt(userId),
      server_id: parseInt(selectedCountry.server_id),
    };
    try {
      setButtonLoading(true);
      const res = await axios({
        method: "post",
        url: `${config.baseurl}/vpn/disconnect`,
        data: vpnData,
        headers: {
          token: `${config.token}`,
        },
      });
      // console.log(res.data);
      if (selectedCountry.vpn_type === "wireguard") {

        RNWireguard.Disconnect()
      
      }else{
        RNSimpleOpenvpn.disconnect();
      }
      
      setStatusVPN("false");
      await AsyncStorage.setItem(STATUS_VPN, JSON.stringify("false"));
    } catch (error) {
      console.error(error);
    } finally {
      setButtonLoading(false);
    }
  }

  async function handleConnection() {
    const vpnData = {
      user_id: parseInt(userId),
      server_id: parseInt(selectedCountry.server_id),
    };
    try {
      setButtonLoading(true);
      const resConnection = await axios({
        url: `${config.baseurl}/vpn/connection/get`,
        method: "post",
        data: vpnData,
        headers: {
          token: `${config.token}`,
        },
      });

      const resVPNFile = await axios({
        url: `${config.baseurl}/vpn/vpn-details/get`,
        method: "post",
        data: JSON.stringify({
          id: userId,
        }),
        headers: {
          "Content-Type": "application/json",
          token: `${config.token}`,
        },
      });
      if (!resVPNFile.data.success)
        Alert.alert("Cannot fetch configurations for the server");

      const vpnConfigFile = resVPNFile.data.user.vpn_details;

      if (
        vpnConfigFile === "" ||
        vpnConfigFile === null ||
        vpnConfigFile === undefined
      )
        Alert.alert("Vpn cannot be setup. Please contact your administrator");

      if (selectedCountry.vpn_type === "wireguard") {

        var notif = {
          icon: 'ic_vpn_default', // Name of the icon in /res directory
          title: 'My VPN',
          text: 'Connected to '
        }

        // Starts the VPN connection
        // After successfull connection you will receive an event
        await RNWireguard.Connect(vpnConfigFile, selectedCountry.flag,notif)


      } else {

        await RNSimpleOpenvpn.connect({
          ovpnString: vpnConfigFile,
          notificationTitle: "YOUR VPN",
        });

      }
      flag = true;
      setStatusVPN("true");

      RNWireguard.Status().then((b:any) => {

        console.log(b,'Statussssssss')

    });
      await AsyncStorage.setItem(STATUS_VPN, JSON.stringify("true"));
    } catch (error) {
      console.error(error,'error.............');
    } finally {
      setButtonLoading(false);
    }
  }

  function handleVpnButtonPress() {
    if (statusVPN === "true") handleDisconnection();
    else handleConnection();
  }

  

  return (
    <GestureHandlerRootView style={{ flex: 1, marginBottom: 0 }}>
      <BottomSheetModalProvider>
        {loading ? (
          <Loading />
        ) : (
          <CustomSafeAreaView
            style={{
              backgroundColor: "#fff",
              paddingTop: 0,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View style={styles.statusVPNContainer}>
                <Text type="b3" style={{ fontSize: 14, marginRight: 6 }}>
                  {statusVPN === "true" ? "Connected" : "Disconnected"}
                </Text>
                <View
                  style={
                    statusVPN === "true" ? styles.greenDot : styles.greyDot
                  }
                />
              </View>
              <AnimationButton
                activated={statusVPN === "true"}
                handlePress={handleVpnButtonPress}
                loading={buttonLoading}
              />
            </View>
            <TouchableOpacity
              style={styles.countryButton}
              onPress={() => {
                bottomSheetRef.current?.snapToIndex(0);
                toggleModalOpened(true);
              }}
            >
              <Image
                source={{
                  uri: `${selectedCountry.flag}`,
                }}
                style={styles.countryImage}
              />
              <Text type="b4" style={{ fontSize: 14, marginRight: 8 }}>
                {selectedCountry.name}
              </Text>
              <ChevronDown color="#333" width={18} />
            </TouchableOpacity>
            {modalOpened && (
              <BottomSheet
                ref={bottomSheetRef}
                snapPoints={["65%"]}
                containerStyle={{ flex: 1, zIndex: 100 }}
                backgroundStyle={{ backgroundColor: "#fff" }}
                animateOnMount={true}
                enablePanDownToClose={true}
                onClose={() => toggleModalOpened(false)}
              >
                <BottomSheetScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    flex: 1,
                    marginBottom: "12%",
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    type="b4"
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      marginBottom: 12,
                    }}
                  >
                    Pick your Server
                  </Text>
                  {countries.length > 0 &&
                    countries.map((item, index) => (
                      <CountryItem
                        key={index}
                        name={item.name}
                        flag={item.flag}
                        server_id={item.server_id}
                        vpnType={item.vpn_type}
                        selectedCountry={selectedCountry.name}
                        setSelectedCountry={({ name, flag, server_id, vpnType }) =>
                          setSelectedCountry({ name, flag, server_id, vpn_type: vpnType })
                        }
                      />
                    ))}
                </BottomSheetScrollView>
              </BottomSheet>
            )}
          </CustomSafeAreaView>
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  statusVPNContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 40,
    backgroundColor: "#fffffe",
    width: "45%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  greyDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#666",
  },

  countryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  countryImage: {
    width: 22,
    aspectRatio: 1,
    marginRight: 20,
    resizeMode: "contain",
  },
});
