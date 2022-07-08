import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video } from "expo-av";

const Help = () => {
  return (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <Video
        source={require("../../assets/MainBGVideo.mp4")}
        style={styles.BackgroundVideo}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <View
        style={{
          width: "80%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Help</Text>
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
