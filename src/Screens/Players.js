import React from "react";
import { View, Text, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Players = (props) => {
  const { PlayersData } = props;

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
      style={{ width: "95%" }}
      showsVerticalScrollIndicator={false}
    >
      {PlayersData.length != 0 &&
        PlayersData.map((player, index) => (
          <View
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              borderWidth: 1,
              borderColor: "#EF5350",
              borderRadius: 18,
              backgroundColor: "#F5F5DD",
              width: "90%",
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#ff1e56",
                borderRadius: 50,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 25,
                  textAlignVertical: "center",
                }}
              >
                {JSON.parse(player)[1].slice(0, 1).toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
              }}
            >
              <FontAwesome name="ticket" size={18} color="#000" />
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                {JSON.parse(player)[2]}
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", color: "darkgreen" }}>
              {JSON.parse(player)[1].toUpperCase()}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
};
export default Players;
