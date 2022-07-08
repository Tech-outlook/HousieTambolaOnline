import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import LoginPage from "../LoginPage/LoginPage";
import HostJoinPage from "../Screens/HostJoinPage";
import GamePage from "../Screens/GamePage";
import Settings from "../Screens/Settings";
import GameOver from "../Screens/GameOver";
import Help from "../Screens/Help";

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const CheckingUserInfo = async () => {
      const CheckingUser = await AsyncStorage.getItem("UserLoging");
      if (CheckingUser === "true") {
        await setIsUserLoggedIn(true);
      }
    };
    CheckingUserInfo();
  }, []);

  const ExportNavigation = () => {
    if (isUserLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HostJoinPage"
              component={HostJoinPage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="GamePage"
              component={GamePage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="GameOver"
              component={GameOver}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{ orientation: "landscape" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="HostJoinPage"
              component={HostJoinPage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="GamePage"
              component={GamePage}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="GameOver"
              component={GameOver}
              options={{ orientation: "landscape" }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{ orientation: "landscape" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };
  return <ExportNavigation />;
};
export default Navigation;
