import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, doc, updateDoc } from "firebase/firestore";
import app from "../../Firebase";
const db = getFirestore(app);

const Settings = ({ route }) => {
  let { GameID } = route.params;
  const gameRef = doc(db, "HousieTambolaGame", GameID);

  //-------------------------------------------------------------------------------//
  const [automaticNumberCalling, setAutomaticNumberCalling] = useState();
  const AutomaticNumberCalling = async () => {
    const AutomaticNumberCallingNumber = await AsyncStorage.getItem(
      "AutomaticNumberCalling"
    );
    setAutomaticNumberCalling(AutomaticNumberCallingNumber);
  };
  useEffect(() => {
    AutomaticNumberCalling();
  }, []);
  //-------------------------------------------------------------------------------//

  //-----------------------------------------------------------------------------------//
  const AutomaticNumberCallingUpdate = async (Number) => {
    await AsyncStorage.setItem("AutomaticNumberCalling", Number);
    AutomaticNumberCalling();
  };
  //------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------//
  const [noOfTicketsPerPlayer, setNoOfTicketsPerPlayer] = useState();

  const NumberOfTickets = async () => {
    const GettingNumberOfTickets = await AsyncStorage.getItem(
      "NumberOfTickets"
    );
    await setNoOfTicketsPerPlayer(Number(GettingNumberOfTickets));

    try {
      await updateDoc(gameRef, {
        NumberOfTickets: GettingNumberOfTickets,
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  useEffect(() => {
    NumberOfTickets();
  }, []);

  const SettingNoOfTickets = async (Type) => {
    if (Type === "subtraction" && noOfTicketsPerPlayer > 1) {
      const UpdateNumber = noOfTicketsPerPlayer - 1;
      await AsyncStorage.setItem("NumberOfTickets", String(UpdateNumber));
    } else if (Type === "addition" && noOfTicketsPerPlayer < 6) {
      const UpdateNumber = noOfTicketsPerPlayer + 1;
      await AsyncStorage.setItem("NumberOfTickets", String(UpdateNumber));
    }
    NumberOfTickets();
  };

  //------------------------------------------------------------------------------------//

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Video
        source={require("../../assets/SettingsBG.mp4")}
        style={styles.BackgroundVideo}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          marginVertical: 20,
          paddingLeft: 110,
        }}
      >
        <View style={styles.SettingsItemView}>
          <Text style={styles.SettingsItemText}>Automatic Number Calling</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[
                styles.ANCBtn,
                {
                  backgroundColor:
                    automaticNumberCalling === "6" ? "gold" : "#fff",
                },
              ]}
              onPress={() => AutomaticNumberCallingUpdate("6")}
            >
              <Text style={styles.ANCBtnText}>Slow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ANCBtn,
                {
                  backgroundColor:
                    automaticNumberCalling === "4" ? "gold" : "#fff",
                },
              ]}
              onPress={() => AutomaticNumberCallingUpdate("4")}
            >
              <Text style={styles.ANCBtnText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ANCBtn,
                {
                  backgroundColor:
                    automaticNumberCalling === "3" ? "gold" : "#fff",
                },
              ]}
              onPress={() => AutomaticNumberCallingUpdate("3")}
            >
              <Text style={styles.ANCBtnText}>Fast</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.SettingsItemView}>
          <Text style={styles.SettingsItemText}>
            Number Of Tickets Per Player
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.NOTPerPlayerBtn}
              onPress={() => SettingNoOfTickets("subtraction")}
            >
              <Ionicons
                name="remove-circle"
                color="#ff1e56"
                size={Math.round(Dimensions.get("window").width / 20)}
              />
            </TouchableOpacity>
            <View style={styles.NOTPerPlayerBtn}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {noOfTicketsPerPlayer}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.NOTPerPlayerBtn}
              onPress={() => SettingNoOfTickets("addition")}
            >
              <Ionicons
                name="add-circle"
                color="green"
                size={Math.round(Dimensions.get("window").width / 20)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  BackgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  SettingsItemView: {
    flexDirection: "row",
    backgroundColor: "pink",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: "80%",
    height: Math.round(Dimensions.get("window").width / 12),
    borderRadius: 10,
    marginBottom: 10,
  },
  SettingsItemText: {
    color: "green",
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 45),
  },
  ANCBtn: {
    backgroundColor: "gold",
    marginRight: 10,
    borderRadius: 10,
    width: Math.round(Dimensions.get("window").width / 9),
    height: Math.round(Dimensions.get("window").width / 20),
    justifyContent: "center",
    alignItems: "center",
  },
  ANCBtnText: {
    color: "green",
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 50),
  },
  NOTPerPlayerBtn: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
