import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";

import {
  getFirestore,
  setDoc,
  doc,
  Timestamp,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import app from "../../Firebase";
const db = getFirestore(app);

const HostJoin = ({ navigation }) => {
  const [gameID, onChangeGameID] = useState("");
  //-----------------------------------------------------------------//
  const [userName, setUserName] = useState();
  const [userUUID, setUserUUID] = useState();
  const [numberOfTickets, setNumberOfTickets] = useState();
  useEffect(() => {
    const GettingUserInfo = async () => {
      const UserInfo = await AsyncStorage.getItem("UserName");
      const nooftickets = await AsyncStorage.getItem("NumberOfTickets");
      const UserUUID = await AsyncStorage.getItem("UserUUID");

      await setUserName(UserInfo);
      await setNumberOfTickets(Number(nooftickets));
      await setUserUUID(UserUUID);
    };
    GettingUserInfo();
  }, []);
  //-----------------------------------------------------------------//

  //------------------------------------------------------------------//
  const NamedUUID = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const HostingGame = async () => {
    const CustomGameID = await NamedUUID();
    try {
      const GameRef = await setDoc(doc(db, "HousieTambolaGame", CustomGameID), {
        HostedBy: userName,
        Players: [JSON.stringify([userUUID, userName, 0])],
        RandomNumbers: [],
        NumberOfTickets: numberOfTickets,
        Jaldi5: [false],
        FirstRow: [false],
        SecondRow: [false],
        ThirdRow: [false],
        FullHousie: [false],
        GameChat: [`Housie Online, Hey There!`],
        PostTime: Timestamp.fromDate(new Date()),
        IsGameStarted: false,
      }).then(() => {
        navigation.navigate("GamePage", {
          GameID: CustomGameID,
          IsHost: true,
        });
      });
    } catch (error) {
      console.error("Error Adding Document: ", error);
    }
  };
  //------------------------------------------------------------------//

  //-------------------------------Join Game-----------------------------//
  const JoinGame = async () => {
    if (gameID != "") {
      try {
        const GameRef = await getDoc(doc(db, "HousieTambolaGame", gameID));
        const GameData = await GameRef.data();
        if (
          GameData.RandomNumbers.length === 0 &&
          GameData.IsGameStarted === false
        ) {
          const gameRef = await doc(db, "HousieTambolaGame", gameID);
          await updateDoc(gameRef, {
            Players: arrayUnion(JSON.stringify([userUUID, userName, 0])),
          });
          navigation.navigate("GamePage", {
            GameID: gameID,
            IsHost: false,
          });
        } else {
          alert(`Game Has Been Started\nAsk Your Host To Start A New Game`);
        }
      } catch (error) {
        alert(`Sonthing Went Wrong\nPlease Try Again`);
      }
    } else {
      alert("Enter Game ID To Join Game");
    }
  };
  //-------------------------------Join Game-----------------------------//

  //------------------------------------------------------------------//
  const SignOut = async () => {
    await AsyncStorage.removeItem("UserLoging");
    await AsyncStorage.removeItem("UserName");
    await AsyncStorage.removeItem("NumberOfTickets");
    await AsyncStorage.removeItem("AutomaticNumberCalling");
    await AsyncStorage.removeItem("UserUUID");
    navigation.navigate("LoginPage");
  };
  //------------------------------------------------------------------//

  return (
    <>
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
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            height: "80%",
          }}
        >
          {userName && (
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: Math.round(Dimensions.get("window").width / 35),
                paddingBottom: "2%",
              }}
            >{`Welcome  ${userName.toUpperCase()}`}</Text>
          )}
          <TouchableOpacity
            style={styles.HostBtn}
            onPress={() => HostingGame()}
          >
            <Text style={styles.HostTxt}>Host Game</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.TextInput}
            placeholder={`Have Invite Code ?\nEnter Here`}
            placeholderTextColor="#7a7a7a"
            onChangeText={onChangeGameID}
            value={gameID}
          />
          <TouchableOpacity style={styles.JoinBtn} onPress={() => JoinGame()}>
            <Text style={styles.JoinTxt}>Join</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID={GoogleAdIDS}
              servePersonalizedAds={false}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.SignoutBtn}
              onPress={() => SignOut()}
            >
              <Text style={styles.SignoutTxt}>Signout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
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
  HostBtn: {
    backgroundColor: "#34a853",
    height: Math.round(Dimensions.get("window").width / 15),
    width: Math.round(Dimensions.get("window").width / 3),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomEndRadius: 50,
    borderTopLeftRadius: 50,
  },
  HostTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 40),
  },
  JoinBtn: {
    backgroundColor: "#4285f4",
    height: Math.round(Dimensions.get("window").width / 15),
    width: Math.round(Dimensions.get("window").width / 3),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomEndRadius: 50,
    borderTopLeftRadius: 50,
  },
  JoinTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 40),
  },
  SignoutBtn: {
    backgroundColor: "red",
    height: Math.round(Dimensions.get("window").width / 18),
    width: Math.round(Dimensions.get("window").width / 5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginRight: 20,
  },
  SignoutTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 40),
  },
  TextInput: {
    backgroundColor: "#fff",
    marginBottom: 5,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderRadius: 10,
    height: Math.round(Dimensions.get("window").width / 15),
    width: Math.round(Dimensions.get("window").width / 3),
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#000",
    textAlign: "center",
  },
});
export default HostJoin;
