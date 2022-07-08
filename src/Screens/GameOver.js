import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import { Video } from "expo-av";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";

const GamePage = ({ route }) => {
  let { Jaldi5, FirstRow, SecondRow, ThirdRow, FullHousie, GameID } =
    route.params;

  useEffect(() => {
    const InterstitialAds = async () => {
      await AdMobInterstitial.setAdUnitID(
        "ca-app-pub-7279563491548364/2792545992"
      );
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    };
    InterstitialAds();
  }, []);

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
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BlurView
          tint="light"
          intensity={35}
          style={{
            height: "99%",
            width: "99%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>Prize</Text>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../../assets/trophy.png")}
                />
              </View>
              <View style={styles.WinnerItem2}>
                <Text
                  style={styles.WinnerItem2Text}
                >{`Winner's    (${GameID})`}</Text>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../../assets/prize.png")}
                />
              </View>
            </View>
          }
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>Jaldi5</Text>
              </View>
              <View style={styles.WinnerItem2}>
                <Text style={styles.WinnerItem2Text}>
                  {Jaldi5[1].toUpperCase()}
                </Text>
              </View>
            </View>
          }
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>First Row</Text>
              </View>
              <View style={styles.WinnerItem2}>
                <Text style={styles.WinnerItem2Text}>
                  {FirstRow[1].toUpperCase()}
                </Text>
              </View>
            </View>
          }
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>Second Row</Text>
              </View>
              <View style={styles.WinnerItem2}>
                <Text style={styles.WinnerItem2Text}>
                  {SecondRow[1].toUpperCase()}
                </Text>
              </View>
            </View>
          }
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>Third Row</Text>
              </View>
              <View style={styles.WinnerItem2}>
                <Text style={styles.WinnerItem2Text}>
                  {ThirdRow[1].toUpperCase()}
                </Text>
              </View>
            </View>
          }
          {
            <View style={styles.WinnerCard}>
              <View style={styles.WinnerItem1}>
                <Text style={styles.WinnerItem1Text}>Full Housie</Text>
              </View>
              <View style={styles.WinnerItem2}>
                <Text style={styles.WinnerItem2Text}>
                  {FullHousie[1].toUpperCase()}
                </Text>
              </View>
            </View>
          }
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
              servePersonalizedAds={true}
            />
          </View>
        </BlurView>
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
  WinnerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: Math.round(Dimensions.get("window").width / 15),
    borderRadius: 0,
    borderBottomWidth: 2,
    borderColor: "green",
    borderRadius: 5,
  },
  WinnerItem1: {
    flexDirection: "row",
    width: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRightWidth: 2,
    borderColor: "green",
  },
  WinnerItem1Text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  WinnerItem2: {
    flexDirection: "row",
    width: "40%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  WinnerItem2Text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GamePage;
