import React from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { Video } from "expo-av";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";

const Help = () => {
  const HelpArray = [
    [
      "How To Claim",
      "Click On Button As Shown On Sample Ticket",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FInShot_20220708_192605764%5B1%5D.jpg?alt=media&token=5672fbd6-1e0d-41e6-92db-3ce15c120497",
    ],
    [
      "Jaldi 5",
      "Any Five Numbers On The Ticket",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FScreenshot_20220708-182704%5B1%5D.png?alt=media&token=ec4b248a-efb9-4c03-a42e-394bfffd2d13",
    ],
    [
      "First Line",
      "All Numbers Of The First Line",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FScreenshot_20220708-183833%5B1%5D.png?alt=media&token=cdc7880f-37ed-4b2e-b5c5-c8cc4b0b9d67",
    ],
    [
      "Second Line",
      "All Numbers Of The Second Line",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FScreenshot_20220708-183324%5B1%5D.png?alt=media&token=a6275a0d-8903-44bd-9176-ece6010bb009",
    ],
    [
      "Third Line",
      "All Numbers Of The Third Line",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FScreenshot_20220708-184235%5B1%5D.png?alt=media&token=2c99cdf2-7868-4145-a405-866e1b2a9a19",
    ],
    [
      "Full Housie",
      "All Numbers Of Any One Of The Ticket",
      "https://firebasestorage.googleapis.com/v0/b/online-housie-e3b45.appspot.com/o/Help%20Page%20Images%2FScreenshot_20220708-185454%5B1%5D.png?alt=media&token=634256c5-0e54-4324-96f8-cf57720e138a",
    ],
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        height: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Video
        source={require("../../assets/MainBGVideo.mp4")}
        style={styles.BackgroundVideo}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {HelpArray.map((item, index) => (
            <View
              key={index}
              style={{
                borderWidth: 2,
                marginVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 10,
                backgroundColor: "#FFEBBE",
                alignItems: "center",
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {item[0]}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {item[1]}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                *Sample Ticket
              </Text>
              <Image
                source={{ uri: item[2] }}
                style={{
                  height: 250,
                  width: 500,
                  resizeMode: "stretch",
                  marginBottom: 5,
                }}
              />
              <AdMobBanner
                bannerSize="banner"
                adUnitID={GoogleAdIDS}
                servePersonalizedAds={true}
              />
            </View>
          ))}
        </ScrollView>
      </View>
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
});

export default Help;
