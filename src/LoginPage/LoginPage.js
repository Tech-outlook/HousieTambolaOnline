import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "../Screens/GoogleAdIDS";

const LoginPage = ({ navigation }) => {
  const [name, onChangeName] = useState("");

  const Letsgo = async () => {
    if (name != "") {
      await AsyncStorage.setItem("UserLoging", "true");
      await AsyncStorage.setItem("UserName", name);
      await AsyncStorage.setItem("NumberOfTickets", "2");
      await AsyncStorage.setItem("AutomaticNumberCalling", "4");
      await AsyncStorage.setItem("UserUUID", uuid.v4());
      await AsyncStorage.setItem("ChatControl", "true");
      onChangeName("");
      await navigation.replace("HostJoinPage");
    }
  };

  return (
    <View style={styles.LoginPageContainer}>
      <Video
        source={require("../../assets/MainBGVideo.mp4")}
        style={styles.BackgroundVideo}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "80%",
          width: "100%",
        }}
      >
        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Name"
            placeholderTextColor="#7a7a7a"
            onChangeText={onChangeName}
            value={name}
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.SocialBtn, { backgroundColor: "#fff" }]}
          onPress={() => Letsgo()}
        >
          <Text style={styles.SocialText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
        }}
      >
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={GoogleAdIDS}
          servePersonalizedAds={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginPageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  BackgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  SocialBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: Math.round(Dimensions.get("window").width / 15),
    width: Math.round(Dimensions.get("window").width / 3),
    marginTop: 20,
    borderRadius: 10,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  SocialText: {
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 40),
    color: "#000",
  },
  TextInput: {
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 5,
    height: Math.round(Dimensions.get("window").width / 15),
    width: Math.round(Dimensions.get("window").width / 3),
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#000",
    textAlign: "center",
    fontSize: Math.round(Dimensions.get("window").width / 40),
  },
});

export default LoginPage;
