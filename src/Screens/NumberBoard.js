import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";

const Numbersboard = (props) => {
  let { data } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const NumbersBoardArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  ];
  return (
    <View style={styles.PopUpOpenBtn}>
      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(0, 10).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(10, 20).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(20, 30).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(30, 40).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(40, 50).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(50, 60).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(60, 70).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(70, 80).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
            <View style={styles.NumBoard}>
              {NumbersBoardArray.slice(80, 90).map((Numbers, index) => (
                <Text
                  style={[
                    styles.NumBoardText,
                    data.map(
                      (Pnum) => Pnum === Numbers && styles.PressedNumBoardText
                    ),
                  ]}
                  key={index}
                >
                  {Numbers}
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              height: "95%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID={GoogleAdIDS}
              servePersonalizedAds={true}
            />
            <Pressable
              style={styles.PopUpCloseBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.PopUpCloseBtnTxt}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.PopUpOpenBtnTxt}>Numbers Board</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  PopUpOpenBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF5350",
    borderRadius: 10,
    height: "90%",
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
  },
  PopUpOpenBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  PopUpCloseBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: Math.round(Dimensions.get("window").width / 5),
    height: Math.round(Dimensions.get("window").width / 15),
  },
  PopUpCloseBtnTxt: {
    color: "#EF5350",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  centeredView: {
    flexDirection: "row",
    backgroundColor: "#EF5350",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  modalView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  NumBoard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  NumBoardText: {
    height: Math.round(Dimensions.get("window").width / 22),
    width: Math.round(Dimensions.get("window").width / 22),
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 100,
    fontSize: Math.round(Dimensions.get("window").width / 50),
  },
  PressedNumBoardText: {
    backgroundColor: "#fff",
    height: Math.round(Dimensions.get("window").width / 22),
    width: Math.round(Dimensions.get("window").width / 22),
    textAlignVertical: "center",
    textAlign: "center",
    color: "#EF5350",
    fontWeight: "bold",
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 3,
    fontSize: Math.round(Dimensions.get("window").width / 50),
  },
});
export default Numbersboard;
