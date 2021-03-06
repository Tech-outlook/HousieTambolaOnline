import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";
import { getFirestore, doc, arrayUnion, updateDoc } from "firebase/firestore";
import app from "../../Firebase";
const db = getFirestore(app);

const GameChat = (props) => {
  const { GameID } = props;
  const gameRef = doc(db, "HousieTambolaGameChat", GameID);

  const [modalVisible, setModalVisible] = useState(false);
  const [message, onChangeMessage] = useState("");

  const PreLoadedMessage = [
    "Hey...!π",
    "Paise vasool...!π΅",
    "Congratulationsπ€",
    "Better luck next timeπ",
    "Aapna time aagayaπ",
    "Take rest π",
    "It's show time π₯",
    "Get ready π₯³",
    "Why late? π",
    "One number only π",
    "Shall we startβ",
  ];
  const PreloadedEmoji = [
    "π₯³",
    "π€ͺ",
    "π",
    "π€­",
    "π",
    "π₯΄",
    "π€¨",
    "π§",
    "π€",
    "π΄",
    "π­",
    "π‘",
    "π·",
    "π",
    "π»",
    "π",
    "π",
    "π",
  ];

  //-----------------------------------------------------------------//
  const [userName, setUserName] = useState();

  useEffect(() => {
    const GettingUserInfo = async () => {
      const UserInfo = await AsyncStorage.getItem("UserName");
      await setUserName(UserInfo);
    };
    GettingUserInfo();
  }, []);
  //-----------------------------------------------------------------//

  const GameChatUpdate = async (Message) => {
    await updateDoc(gameRef, {
      GameChat: arrayUnion(`${userName}, ${Message}`),
    });
    await setModalVisible(!modalVisible);
    onChangeMessage("");
  };

  return (
    <View style={styles.ChatbuttonOpenView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.ChatBox}>
          <View style={styles.ChatBoxView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 10,
              }}
            >
              <AdMobBanner
                bannerSize="banner"
                adUnitID={GoogleAdIDS}
                servePersonalizedAds={true}
              />
            </View>
            {
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {PreLoadedMessage.map((message, index) => (
                    <Text
                      key={index}
                      style={styles.PreloadedText}
                      onPress={() => GameChatUpdate(message)}
                    >
                      {message}
                    </Text>
                  ))}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {PreloadedEmoji.map((Emoji, index) => (
                    <Text
                      key={index}
                      style={styles.PreloadedEmoji}
                      onPress={() => GameChatUpdate(Emoji)}
                    >
                      {Emoji}
                    </Text>
                  ))}
                </View>
              </View>
            }

            {
              <View
                style={{
                  width: "98%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  paddingVertical: 5,
                  borderWidth: 1,
                  marginVertical: 5,
                  borderRadius: 10,
                }}
              >
                <TextInput
                  style={{
                    width: "88%",
                    padding: 8,
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                  placeholder="Type Here..."
                  placeholderTextColor={"#000"}
                  onChangeText={onChangeMessage}
                  value={message}
                />
                <Pressable onPress={() => GameChatUpdate(message)}>
                  <FontAwesome name="send" size={28} color="#000" />
                </Pressable>
              </View>
            }
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            ></Pressable>
          </View>
        </View>
      </Modal>
      {
        <Pressable
          style={styles.ChatbuttonOpen}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.ChatbuttonOpenText}>Chat</Text>
        </Pressable>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  ChatbuttonOpenView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    width: "95%",
  },
  ChatbuttonOpen: {
    width: "95%",
    backgroundColor: "#F5F5DD",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  ChatbuttonOpenText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
    fontSize: Math.round(Dimensions.get("window").height / 22),
  },

  ChatBox: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ChatBoxView: {
    width: "50%",
    height: "100%",
    backgroundColor: "#F5F5DD",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },

  PreloadedText: {
    color: "#000",
    fontWeight: "500",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 2,
    marginTop: 5,
    fontSize: Math.round(Dimensions.get("window").height / 28),
    textAlign: "center",
  },
  PreloadedEmoji: {
    fontSize: 30,
    marginHorizontal: 5,
  },
});

export default GameChat;
