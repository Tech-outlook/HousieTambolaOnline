import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StyleSheet,
  Share,
} from "react-native";
import * as Speech from "expo-speech";
import tambola from "tambola";
import Ionicons from "react-native-vector-icons/Ionicons";
import Numbersboard from "./NumberBoard";
import GameChat from "./GameChat";
import Players from "./Players";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdMobBanner } from "expo-ads-admob";
import { GoogleAdIDS } from "./GoogleAdIDS";

import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import app from "../../Firebase";
const db = getFirestore(app);

const GamePage = ({ route, navigation }) => {
  let { GameID, IsHost } = route.params;
  const gameRef = doc(db, "HousieTambolaGame", GameID);

  const [generatedTickets, setGeneratedTickets] = useState([]);

  const [firstTicket, setFirstTicket] = useState([]);
  const [secondTicket, setSecondTicket] = useState([]);
  const [thirdTicket, setThirdTicket] = useState([]);
  const [fourthTicket, setFourthTicket] = useState([]);
  const [fifthTicket, setFifthTicket] = useState([]);
  const [sixthTicket, setSixthTicket] = useState([]);

  const indexOfDrawnNumber = useRef(0);
  const intervalId = useRef(0);

  const [cloudGameData, setCloudGameData] = useState({});

  const [playPauseBtn, setPlayPauseBtn] = useState({
    playpausebtn: false,
    playpauseIcon: "play",
    playpauseIconColor: "#2E7D32",
    IsGameStarted: false,
  });

  //----------------------------------------------------------------//
  useEffect(() => {
    const GameRealTimeData = onSnapshot(
      doc(db, "HousieTambolaGame", GameID),
      (doc) => {
        setCloudGameData(doc.data());
      }
    );
  }, []);
  //----------------------------------------------------------------//

  //-------------------------------------------------------------------------//
  const [randomNumbers1to90, setRandomNumbers1to90] = useState([]);
  const [userName, setUserName] = useState();
  const [automaticNumberCalling, setAutomaticNumberCalling] = useState();
  const [userUUID, setUserUUID] = useState();

  const GeneratingRandomNumbers1to90 = async () => {
    const RandomNumbers1to90Array = await tambola.getDrawSequence();
    await setRandomNumbers1to90(RandomNumbers1to90Array);

    const UserInfo = await AsyncStorage.getItem("UserName");
    await setUserName(UserInfo);

    const AutomaticNumberCalling = await AsyncStorage.getItem(
      "AutomaticNumberCalling"
    );
    await setAutomaticNumberCalling(Number(AutomaticNumberCalling));

    const UserUUID = await AsyncStorage.getItem("UserUUID");
    await setUserUUID(UserUUID);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GeneratingRandomNumbers1to90();
    });
    return unsubscribe;
  }, [navigation]);
  //-------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  const GenerateTicket = async () => {
    const Ticket = await tambola.generateTicket();
    setGeneratedTickets((prevState) => [...prevState, Ticket]);
    await UpdatingPlayersTicketsLength("Add");
  };
  //--------------------------------------------------------------------------//

  //-------------------------------------------------------------------------//
  const [pressednumbers, setPressednumbers] = useState([]);
  const OnPressNumber = async (Number) => {
    const CheckingPressedNumbers = await pressednumbers.includes(Number);
    const CheckingWithDrawnNumber = await cloudGameData.RandomNumbers.includes(
      Number
    );

    if (CheckingPressedNumbers) {
      await setPressednumbers(
        pressednumbers.filter((number) => number !== Number)
      );
    } else if (CheckingWithDrawnNumber) {
      await setPressednumbers((prevState) => [...prevState, Number]);
    }

    //-------------------------------------------------------//
    const FirstTicketData =
      generatedTickets.length >= 1 &&
      (await [
        ...generatedTickets[0][0],
        ...generatedTickets[0][1],
        ...generatedTickets[0][2],
      ].includes(Number));

    if (FirstTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await firstTicket.includes(Number);
      if (FliteringNumbers) {
        await setFirstTicket(firstTicket.filter((number) => number != Number));
      } else {
        await setFirstTicket((prevState) => [...prevState, Number]);
      }
    }
    //-------------------------------------------------------//

    //-----------------------------------------------------------//
    const SecondTicketData =
      generatedTickets.length >= 2 &&
      (await [
        ...generatedTickets[1][0],
        ...generatedTickets[1][1],
        ...generatedTickets[1][2],
      ].includes(Number));

    if (SecondTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await secondTicket.includes(Number);
      if (FliteringNumbers) {
        await setSecondTicket(
          secondTicket.filter((number) => number != Number)
        );
      } else {
        await setSecondTicket((prevState) => [...prevState, Number]);
      }
    }
    //-----------------------------------------------------------//

    //--------------------------------------------------------------//
    const ThirdTicketData =
      generatedTickets.length >= 3 &&
      (await [
        ...generatedTickets[2][0],
        ...generatedTickets[2][1],
        ...generatedTickets[2][2],
      ].includes(Number));

    if (ThirdTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await thirdTicket.includes(Number);
      if (FliteringNumbers) {
        await setThirdTicket(thirdTicket.filter((number) => number != Number));
      } else {
        await setThirdTicket((prevState) => [...prevState, Number]);
      }
    }
    //--------------------------------------------------------------//

    //--------------------------------------------------------------//
    const FourthTicketData =
      generatedTickets.length >= 4 &&
      (await [
        ...generatedTickets[3][0],
        ...generatedTickets[3][1],
        ...generatedTickets[3][2],
      ].includes(Number));

    if (FourthTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await fourthTicket.includes(Number);
      if (FliteringNumbers) {
        await setFourthTicket(
          fourthTicket.filter((number) => number != Number)
        );
      } else {
        await setFourthTicket((prevState) => [...prevState, Number]);
      }
    }
    //--------------------------------------------------------------//

    //-----------------------------------------------------------------//
    const FifthTicketData =
      generatedTickets.length >= 5 &&
      (await [
        ...generatedTickets[4][0],
        ...generatedTickets[4][1],
        ...generatedTickets[4][2],
      ].includes(Number));

    if (FifthTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await fifthTicket.includes(Number);
      if (FliteringNumbers) {
        await setFifthTicket(fifthTicket.filter((number) => number != Number));
      } else {
        await setFifthTicket((prevState) => [...prevState, Number]);
      }
    }
    //-----------------------------------------------------------------//

    //-----------------------------------------------------------------//
    const SixthTicketData =
      generatedTickets.length >= 6 &&
      (await [
        ...generatedTickets[5][0],
        ...generatedTickets[5][1],
        ...generatedTickets[5][2],
      ].includes(Number));

    if (SixthTicketData && CheckingWithDrawnNumber) {
      const FliteringNumbers = await sixthTicket.includes(Number);
      if (FliteringNumbers) {
        await setSixthTicket(sixthTicket.filter((number) => number != Number));
      } else {
        await setSixthTicket((prevState) => [...prevState, Number]);
      }
    }
    //-----------------------------------------------------------------//
  };
  //-------------------------------------------------------------------------//

  //------------------------------------------------------------------------//
  let index = indexOfDrawnNumber.current;
  const RandomNumbersTimeInterval = async () => {
    const Number = await randomNumbers1to90[index];
    if (cloudGameData.RandomNumbers.length !== 90) {
      await updateDoc(gameRef, {
        RandomNumbers: arrayUnion(Number),
      });
      const UpdateIndex = await index++;
      indexOfDrawnNumber.current = UpdateIndex;
    }
  };
  if (
    IsHost === true &&
    cloudGameData.RandomNumbers !== undefined &&
    cloudGameData.RandomNumbers.length === 90
  ) {
    clearInterval(intervalId.current);
  }
  const RandomNumberGeneration = async () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = 0;
      return;
    }
    const timer = setInterval(function () {
      RandomNumbersTimeInterval();
    }, automaticNumberCalling * 1000);
    intervalId.current = timer;
  };
  //------------------------------------------------------------------------//

  //-------------------------------Jaldi5----------------------------------------//
  const ClaimJaldi5 = async () => {
    const tickets = generatedTickets;
    const VerifyingFirstTicket =
      tickets.length >= 1 &&
      firstTicket.length >= 5 &&
      (await firstTicket.every((number1) =>
        [...tickets[0][0], ...tickets[0][1], ...tickets[0][2]].includes(number1)
      ));

    const VerifyingSecondTicket =
      tickets.length >= 2 &&
      secondTicket.length >= 5 &&
      (await secondTicket.every((number2) =>
        [...tickets[1][0], ...tickets[1][1], ...tickets[1][2]].includes(number2)
      ));

    const VerifyingThirdTicket =
      tickets.length >= 3 &&
      thirdTicket.length >= 5 &&
      (await thirdTicket.every((number3) =>
        [...tickets[2][0], ...tickets[2][1], ...tickets[2][2]].includes(number3)
      ));

    const VerifyingFourthTicket =
      tickets.length >= 4 &&
      fourthTicket.length >= 5 &&
      (await fourthTicket.every((number4) =>
        [...tickets[3][0], ...tickets[3][1], ...tickets[3][2]].includes(number4)
      ));

    const VerifyingFifthTicket =
      tickets.length >= 5 &&
      fifthTicket.length >= 5 &&
      (await fifthTicket.every((number5) =>
        [...tickets[4][0], ...tickets[4][1], ...tickets[4][2]].includes(number5)
      ));

    const VerifyingSixthTicket =
      tickets.length >= 6 &&
      sixthTicket.length >= 5 &&
      (await sixthTicket.every((number6) =>
        [...tickets[5][0], ...tickets[5][1], ...tickets[5][2]].includes(number6)
      ));

    if (
      cloudGameData.Jaldi5 != undefined &&
      cloudGameData.Jaldi5[0] === false
    ) {
      if (
        VerifyingFirstTicket ||
        VerifyingSecondTicket ||
        VerifyingThirdTicket ||
        VerifyingFourthTicket ||
        VerifyingFifthTicket ||
        VerifyingSixthTicket
      ) {
        await Jaldi5ClaimUploadingToCloud();
      } else {
        alert("Wait For Few More Numbers");
      }
    } else if (
      cloudGameData.Jaldi5 != undefined &&
      cloudGameData.Jaldi5[0] === true
    ) {
      alert(`${cloudGameData.Jaldi5[1]} Already Claimed Jaldi5`);
    }
  };

  const Jaldi5ClaimUploadingToCloud = async () => {
    try {
      await updateDoc(gameRef, {
        Jaldi5: [true, userName],
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  //-------------------------------Jaldi5---------------------------------------//

  //--------------------------------FirstRow-----------------------------------------------//
  const ClaimFirstRow = async () => {
    const tickets = generatedTickets;
    const VerifyingFirstTicket =
      tickets.length >= 1 &&
      (await [...tickets[0][0]]
        .filter((number1) => number1 !== 0)
        .every((num1) => firstTicket.includes(num1)));

    const VerifyingSecondTicket =
      tickets.length >= 2 &&
      (await [...tickets[1][0]]
        .filter((number2) => number2 !== 0)
        .every((num2) => secondTicket.includes(num2)));

    const VerifyingThirdTicket =
      tickets.length >= 3 &&
      (await [...tickets[2][0]]
        .filter((number3) => number3 !== 0)
        .every((num3) => thirdTicket.includes(num3)));

    const VerifyingFourthTicket =
      tickets.length >= 4 &&
      (await [...tickets[3][0]]
        .filter((number4) => number4 !== 0)
        .every((num4) => fourthTicket.includes(num4)));

    const VerifyingFifthTicket =
      tickets.length >= 5 &&
      (await [...tickets[4][0]]
        .filter((number5) => number5 !== 0)
        .every((num5) => fifthTicket.includes(num5)));

    const VerifyingSixthTicket =
      tickets.length >= 6 &&
      (await [...tickets[5][0]]
        .filter((number6) => number6 !== 0)
        .every((num6) => sixthTicket.includes(num6)));

    if (
      cloudGameData.FirstRow != undefined &&
      cloudGameData.FirstRow[0] === false
    ) {
      if (
        VerifyingFirstTicket ||
        VerifyingSecondTicket ||
        VerifyingThirdTicket ||
        VerifyingFourthTicket ||
        VerifyingFourthTicket ||
        VerifyingFifthTicket ||
        VerifyingSixthTicket
      ) {
        await FirstRowClaimUploadingToCloud();
      } else {
        alert("Wait For Few More Numbers");
      }
    } else if (
      cloudGameData.FirstRow != undefined &&
      cloudGameData.FirstRow[0] === true
    ) {
      alert(`${cloudGameData.FirstRow[1]} Already Claimed First Row`);
    }
  };

  const FirstRowClaimUploadingToCloud = async () => {
    try {
      await updateDoc(gameRef, {
        FirstRow: [true, userName],
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  //---------------------------------FirstRow--------------------------------------------//

  //-----------------------------------SecondRow-----------------------------------------//
  const ClaimSecondRow = async () => {
    const tickets = generatedTickets;
    const VerifyingFirstTicket =
      tickets.length >= 1 &&
      (await [...tickets[0][1]]
        .filter((number1) => number1 !== 0)
        .every((num1) => firstTicket.includes(num1)));

    const VerifyingSecondTicket =
      tickets.length >= 2 &&
      (await [...tickets[1][1]]
        .filter((number2) => number2 !== 0)
        .every((num2) => secondTicket.includes(num2)));

    const VerifyingThirdTicket =
      tickets.length >= 3 &&
      (await [...tickets[2][1]]
        .filter((number3) => number3 !== 0)
        .every((num3) => thirdTicket.includes(num3)));

    const VerifyingFourthTicket =
      tickets.length >= 4 &&
      (await [...tickets[3][1]]
        .filter((number4) => number4 !== 0)
        .every((num4) => fourthTicket.includes(num4)));

    const VerifyingFifthTicket =
      tickets.length >= 5 &&
      (await [...tickets[4][1]]
        .filter((number5) => number5 !== 0)
        .every((num5) => fifthTicket.includes(num5)));

    const VerifyingSixthTicket =
      tickets.length >= 6 &&
      (await [...tickets[5][1]]
        .filter((number6) => number6 !== 0)
        .every((num6) => sixthTicket.includes(num6)));

    if (
      cloudGameData.SecondRow != undefined &&
      cloudGameData.SecondRow[0] === false
    ) {
      if (
        VerifyingFirstTicket ||
        VerifyingSecondTicket ||
        VerifyingThirdTicket ||
        VerifyingFourthTicket ||
        VerifyingFourthTicket ||
        VerifyingFifthTicket ||
        VerifyingSixthTicket
      ) {
        await SecondRowClaimUploadingToCloud();
      } else {
        alert("Wait For Few More Numbers");
      }
    } else if (
      cloudGameData.SecondRow != undefined &&
      cloudGameData.SecondRow[0] === true
    ) {
      alert(`${cloudGameData.SecondRow[1]} Already Claimed Second Row`);
    }
  };

  const SecondRowClaimUploadingToCloud = async () => {
    try {
      await updateDoc(gameRef, {
        SecondRow: [true, userName],
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  //-----------------------------------SecondRow-----------------------------------------//

  //-------------------------------------ThirdRow---------------------------------------//
  const ClaimThirdRow = async () => {
    const tickets = generatedTickets;
    const VerifyingFirstTicket =
      tickets.length >= 1 &&
      (await [...tickets[0][2]]
        .filter((number1) => number1 !== 0)
        .every((num1) => firstTicket.includes(num1)));

    const VerifyingSecondTicket =
      tickets.length >= 2 &&
      (await [...tickets[1][2]]
        .filter((number2) => number2 !== 0)
        .every((num2) => secondTicket.includes(num2)));

    const VerifyingThirdTicket =
      tickets.length >= 3 &&
      (await [...tickets[2][2]]
        .filter((number3) => number3 !== 0)
        .every((num3) => thirdTicket.includes(num3)));

    const VerifyingFourthTicket =
      tickets.length >= 4 &&
      (await [...tickets[3][2]]
        .filter((number4) => number4 !== 0)
        .every((num4) => fourthTicket.includes(num4)));

    const VerifyingFifthTicket =
      tickets.length >= 5 &&
      (await [...tickets[4][2]]
        .filter((number5) => number5 !== 0)
        .every((num5) => fifthTicket.includes(num5)));

    const VerifyingSixthTicket =
      tickets.length >= 6 &&
      (await [...tickets[5][2]]
        .filter((number6) => number6 !== 0)
        .every((num6) => sixthTicket.includes(num6)));

    if (
      cloudGameData.ThirdRow != undefined &&
      cloudGameData.ThirdRow[0] === false
    ) {
      if (
        VerifyingFirstTicket ||
        VerifyingSecondTicket ||
        VerifyingThirdTicket ||
        VerifyingFourthTicket ||
        VerifyingFourthTicket ||
        VerifyingFifthTicket ||
        VerifyingSixthTicket
      ) {
        await ThirdRowClaimUploadingToCloud();
      } else {
        alert("Wait For Few More Numbers");
      }
    } else if (
      cloudGameData.ThirdRow != undefined &&
      cloudGameData.ThirdRow[0] === true
    ) {
      alert(`${cloudGameData.ThirdRow[1]} Already Claimed Third Row`);
    }
  };

  const ThirdRowClaimUploadingToCloud = async () => {
    try {
      await updateDoc(gameRef, {
        ThirdRow: [true, userName],
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  //-------------------------------------ThirdRow---------------------------------------//

  //--------------------------------------FullHousie--------------------------------------//
  const ClaimFullHousie = async () => {
    const tickets = generatedTickets;
    const VerifyingFirstTicket =
      tickets.length >= 1 &&
      (await [...tickets[0][0], ...tickets[0][1], ...tickets[0][2]]
        .filter((number1) => number1 !== 0)
        .every((num1) => firstTicket.includes(num1)));

    const VerifyingSecondTicket =
      tickets.length >= 2 &&
      (await [...tickets[1][0], ...tickets[1][1], ...tickets[1][2]]
        .filter((number2) => number2 !== 0)
        .every((num2) => secondTicket.includes(num2)));

    const VerifyingThirdTicket =
      tickets.length >= 3 &&
      (await [...tickets[2][0], ...tickets[2][1], ...tickets[2][2]]
        .filter((number3) => number3 !== 0)
        .every((num3) => thirdTicket.includes(num3)));

    const VerifyingFourthTicket =
      tickets.length >= 4 &&
      (await [...tickets[3][0], ...tickets[3][1], ...tickets[3][2]]
        .filter((number4) => number4 !== 0)
        .every((num4) => fourthTicket.includes(num4)));

    const VerifyingFifthTicket =
      tickets.length >= 5 &&
      (await [...tickets[4][0], ...tickets[4][1], ...tickets[4][2]]
        .filter((number5) => number5 !== 0)
        .every((num5) => fifthTicket.includes(num5)));

    const VerifyingSixthTicket =
      tickets.length >= 6 &&
      (await [...tickets[5][0], ...tickets[5][1], ...tickets[5][2]]
        .filter((number6) => number6 !== 0)
        .every((num6) => sixthTicket.includes(num6)));

    if (
      cloudGameData.FullHousie != undefined &&
      cloudGameData.FullHousie[0] === false
    ) {
      if (
        VerifyingFirstTicket ||
        VerifyingSecondTicket ||
        VerifyingThirdTicket ||
        VerifyingFourthTicket ||
        VerifyingFourthTicket ||
        VerifyingFifthTicket ||
        VerifyingSixthTicket
      ) {
        await FullHousieClaimUploadingToCloud();
      } else {
        alert("Wait For Few More Numbers");
      }
    } else if (
      cloudGameData.FullHousie != undefined &&
      cloudGameData.FullHousie[0] === true
    ) {
      alert(`${cloudGameData.FullHousie[1]} Already Claimed FullHousie`);
    }
  };

  const FullHousieClaimUploadingToCloud = async () => {
    try {
      await updateDoc(gameRef, {
        FullHousie: [true, userName],
      });
    } catch (error) {
      alert(`Something Went Wrong\nPlease Try Again`);
    }
  };
  //--------------------------------------FullHousie--------------------------------------//

  //--------------------------------Cancle Tickets-----------------------------------------//
  const CancleTickets = async (index) => {
    await setGeneratedTickets(
      generatedTickets.filter((Ticket, Ticketindex) => Ticketindex !== index)
    );
    await UpdatingPlayersTicketsLength("Sub");
    setFirstTicket([]);
    setSecondTicket([]);
    setThirdTicket([]);
    setFourthTicket([]);
    setFifthTicket([]);
    setSixthTicket([]);
  };
  //--------------------------------Cancle Tickets-----------------------------------------//

  //---------------------------------Play Pause Button---------------------------------------//
  const PlayPauseBtnControl = () => {
    if (playPauseBtn.playpausebtn === false) {
      setPlayPauseBtn({
        playpausebtn: true,
        playpauseIcon: "pause",
        playpauseIconColor: "#EF5350",
        IsGameStarted: true,
      });
    }
    if (playPauseBtn.playpausebtn === true) {
      setPlayPauseBtn({
        playpausebtn: false,
        playpauseIcon: "play",
        playpauseIconColor: "#2E7D32",
      });
    }
  };
  //---------------------------------Play Pause Button---------------------------------------//

  //-------------------------------------GameId Share----------------------------------------//
  const ShareGameID = async () => {
    await Share.share({
      message: GameID,
    });
  };
  //-------------------------------------GameId Share----------------------------------------//

  //------------------------------------------------------------------------------------------//
  const UpdatingPlayersTicketsLength = async (Type) => {
    const FliteringThisUser = cloudGameData.Players.filter(
      (player) => JSON.parse(player)[0] !== userUUID
    );

    if (Type === "Add") {
      try {
        await updateDoc(gameRef, {
          Players: [
            ...FliteringThisUser,
            JSON.stringify([userUUID, userName, generatedTickets.length + 1]),
          ],
        });
      } catch (error) {
        alert(`Something Went Wrong\nPlease Try Again`);
      }
    } else if (Type === "Sub") {
      try {
        await updateDoc(gameRef, {
          Players: [
            ...FliteringThisUser,
            JSON.stringify([userUUID, userName, generatedTickets.length - 1]),
          ],
        });
      } catch (error) {
        alert(`Something Went Wrong\nPlease Try Again`);
      }
    }
  };
  //------------------------------------------------------------------------------------------//

  //-----------------------------------------------------------------------------------------//
  if (
    cloudGameData.Jaldi5 !== undefined &&
    cloudGameData.Jaldi5[0] === true &&
    cloudGameData.FirstRow[0] === true &&
    cloudGameData.SecondRow[0] === true &&
    cloudGameData.ThirdRow[0] === true &&
    cloudGameData.FullHousie[0] === true
  ) {
    if (IsHost === true) {
      clearInterval(intervalId.current);
    }
    setTimeout(() => {
      navigation.replace("GameOver", {
        GameID: GameID,
        Jaldi5: cloudGameData.Jaldi5,
        FirstRow: cloudGameData.FirstRow,
        SecondRow: cloudGameData.SecondRow,
        ThirdRow: cloudGameData.ThirdRow,
        FullHousie: cloudGameData.FullHousie,
      });
    }, 2000);
  }
  //-----------------------------------------------------------------------------------------//

  //---------------------------------------------------------------------//
  useEffect(() => {
    const TextToSpeech = async () => {
      if (
        cloudGameData.RandomNumbers !== undefined &&
        cloudGameData.RandomNumbers.length !== 0 &&
        volume === true
      ) {
        const TextToSpeechNumber = await cloudGameData.RandomNumbers[
          cloudGameData.RandomNumbers.length - 1
        ].toString();
        await Speech.speak(TextToSpeechNumber);
      }
    };
    TextToSpeech();
  }, [cloudGameData.RandomNumbers]);
  //---------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------//
  const [volume, setVolume] = useState(false);

  const VolumeControl = () => {
    if (volume) {
      setVolume(false);
    } else {
      setVolume(true);
    }
  };
  //------------------------------------------------------------------------------------------//

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Image
        source={require("../../assets/GameBG.png")}
        style={{ position: "absolute" }}
      />
      <View
        style={{
          height: "100%",
          width: "17%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {cloudGameData.Players != undefined && (
          <Players PlayersData={cloudGameData.Players} />
        )}
        {cloudGameData.Players != undefined && <GameChat GameID={GameID} />}
      </View>
      {
        <View
          style={{
            height: "100%",
            width: "60%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              backgroundColor: "#F5F5DD",
              borderWidth: 1,
              borderColor: "#ff1e56",
              borderBottomLeftRadius: 30,
              borderTopRightRadius: 30,
              borderRadius: 10,
              marginTop: 4,
              height: "14%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "70%",
                height: "80%",
                paddingHorizontal: 10,
                borderRadius: 20,
              }}
            >
              {cloudGameData.RandomNumbers != undefined &&
              cloudGameData.RandomNumbers.length === 0 ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 32),
                    textAlign: "center",
                  }}
                >
                  Start The Game... && The Numbers Will Display Here...!
                </Text>
              ) : (
                cloudGameData.RandomNumbers != undefined &&
                cloudGameData.RandomNumbers.slice(-6, -1).map(
                  (Number, index) => (
                    <Text key={index} style={styles.Drawnumber}>
                      {Number}
                    </Text>
                  )
                )
              )}
              {cloudGameData.RandomNumbers != undefined &&
                cloudGameData.RandomNumbers.length !== 0 && (
                  <Text
                    style={[
                      styles.Drawnumber,
                      { marginLeft: 30, backgroundColor: "#2E7D32" },
                    ]}
                  >
                    {cloudGameData.RandomNumbers.slice(-1)}
                  </Text>
                )}
            </View>
            <View>
              <TouchableOpacity onPress={() => VolumeControl()}>
                {volume === true ? (
                  <Ionicons
                    name="volume-high"
                    color="#2E7D32"
                    size={Math.round(Dimensions.get("window").width / 30)}
                  />
                ) : (
                  <Ionicons
                    name="volume-mute"
                    color="#ff1e56"
                    size={Math.round(Dimensions.get("window").width / 30)}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {cloudGameData.RandomNumbers != undefined &&
            cloudGameData.RandomNumbers.length === 0 && (
              <TouchableOpacity
                onPress={() => ShareGameID()}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 2,
                  borderRadius: 5,
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginHorizontal: 10,
                    letterSpacing: 1,
                  }}
                >
                  {`GAME ID:-     ${GameID}`}
                </Text>
                <Ionicons name="share-social-sharp" color="#000" size={18} />
              </TouchableOpacity>
            )}
          {cloudGameData.GameChat !== undefined && (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginTop: 2,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Ionicons name="chatbox-ellipses" color="#000" size={16} />
              <Text
                style={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginHorizontal: 1,
                  textAlignVertical: "center",
                  letterSpacing: 0.3,
                }}
              >
                {`${
                  cloudGameData.GameChat[
                    cloudGameData.GameChat.length - 1
                  ].split(",")[0]
                } --   ${
                  cloudGameData.GameChat[
                    cloudGameData.GameChat.length - 1
                  ].split(",")[1]
                }`}
              </Text>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {generatedTickets.length !== 0 &&
              generatedTickets.map((Ticket, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 5,
                    backgroundColor: "#F5F5DD",
                    borderRadius: 10,
                    marginVertical: 4,
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      {Ticket[0].map((Number, Numberindex) => (
                        <Pressable
                          onPress={() => OnPressNumber(Number)}
                          key={Numberindex}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            width: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            margin: 0.5,
                            borderRadius: 4,
                            backgroundColor: "#0f4c81",
                          }}
                        >
                          {Number != 0 && (
                            <Text
                              style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                height: "75%",
                                width: "75%",
                                borderRadius: 100,
                                fontWeight: "bold",
                                fontSize: 15,
                                backgroundColor: pressednumbers.includes(Number)
                                  ? "#ff1e56"
                                  : "#fff",
                                color: pressednumbers.includes(Number)
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              {Number}
                            </Text>
                          )}
                        </Pressable>
                      ))}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {Ticket[1].map((Number, Numberindex) => (
                        <Pressable
                          onPress={() => OnPressNumber(Number)}
                          key={Numberindex}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            width: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            margin: 0.5,
                            borderRadius: 4,
                            backgroundColor: "#0f4c81",
                          }}
                        >
                          {Number != 0 && (
                            <Text
                              style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                height: "75%",
                                width: "75%",
                                borderRadius: 100,
                                fontWeight: "bold",
                                fontSize: 15,
                                backgroundColor: pressednumbers.includes(Number)
                                  ? "#ff1e56"
                                  : "#fff",
                                color: pressednumbers.includes(Number)
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              {Number}
                            </Text>
                          )}
                        </Pressable>
                      ))}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {Ticket[2].map((Number, Numberindex) => (
                        <Pressable
                          onPress={() => OnPressNumber(Number)}
                          key={Numberindex}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            width: Math.round(
                              Dimensions.get("window").width / 19
                            ),
                            margin: 0.5,
                            borderRadius: 4,
                            backgroundColor: "#0f4c81",
                          }}
                        >
                          {Number != 0 && (
                            <Text
                              style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                height: "75%",
                                width: "75%",
                                borderRadius: 100,
                                fontWeight: "bold",
                                fontSize: 15,
                                backgroundColor: pressednumbers.includes(Number)
                                  ? "#ff1e56"
                                  : "#fff",
                                color: pressednumbers.includes(Number)
                                  ? "#fff"
                                  : "#000",
                              }}
                            >
                              {Number}
                            </Text>
                          )}
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  {cloudGameData.RandomNumbers != undefined &&
                    cloudGameData.RandomNumbers.length === 0 && (
                      <TouchableOpacity
                        style={{
                          height: Math.round(
                            Dimensions.get("window").width / 25
                          ),
                          bottom: 5,
                        }}
                        onPress={() => CancleTickets(index)}
                      >
                        <Ionicons
                          name="close-circle"
                          size={Math.round(Dimensions.get("window").width / 25)}
                          color="#ff1e56"
                        />
                      </TouchableOpacity>
                    )}
                </View>
              ))}
            {cloudGameData.RandomNumbers != undefined &&
              cloudGameData.RandomNumbers.length === 0 &&
              cloudGameData.NumberOfTickets > generatedTickets.length && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 5,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#fff",
                    width: "90%",
                    height: Math.round(Dimensions.get("window").width / 6),
                  }}
                >
                  <Image
                    source={require("../../assets/GenerateTicketBG.png")}
                    style={{
                      resizeMode: "contain",
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      opacity: 0.5,
                      borderRadius: 5,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => GenerateTicket()}
                  >
                    <Text
                      style={{
                        color: "#EF5350",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Generate Ticket
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {cloudGameData.RandomNumbers !== undefined &&
              cloudGameData.RandomNumbers.length === 0 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <AdMobBanner
                    bannerSize="banner"
                    adUnitID={GoogleAdIDS}
                    servePersonalizedAds={false}
                  />
                </View>
              )}
          </ScrollView>
        </View>
      }
      <View
        style={{
          height: "100%",
          width: "23%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {IsHost === true && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              height: "15%",
              alignItems: "center",
            }}
          >
            {playPauseBtn.IsGameStarted === false && (
              <View
                style={{
                  backgroundColor: "#EF5350",
                  padding: 5,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Settings", {
                      GameID: GameID,
                    })
                  }
                >
                  <Ionicons
                    name="settings-sharp"
                    size={Math.round(Dimensions.get("window").width / 25)}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                backgroundColor: "#fff",
                padding: 4,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#EF5350",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  RandomNumberGeneration(), PlayPauseBtnControl();
                }}
              >
                <Ionicons
                  name={playPauseBtn.playpauseIcon}
                  size={Math.round(Dimensions.get("window").width / 25)}
                  color={playPauseBtn.playpauseIconColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={[
              styles.claimBtn,
              {
                backgroundColor:
                  cloudGameData.Jaldi5 != undefined &&
                  cloudGameData.Jaldi5[0] === true
                    ? "#fff"
                    : "#2E7D32",

                borderColor:
                  cloudGameData.Jaldi5 != undefined &&
                  cloudGameData.Jaldi5[0] === true
                    ? "#2E7D32"
                    : "#fff",
              },
            ]}
            onPress={() => ClaimJaldi5()}
          >
            <Text
              style={[
                styles.claimBtnText,
                {
                  color:
                    cloudGameData.Jaldi5 != undefined &&
                    cloudGameData.Jaldi5[0] === true
                      ? "#2E7D32"
                      : "#fff",
                },
              ]}
            >
              Jaldi 5
            </Text>
            {cloudGameData.Jaldi5 != undefined &&
              cloudGameData.Jaldi5[0] === true && (
                <Text
                  style={{
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 35),
                  }}
                >
                  {cloudGameData.Jaldi5[1]}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.claimBtn,
              {
                backgroundColor:
                  cloudGameData.FirstRow != undefined &&
                  cloudGameData.FirstRow[0] === true
                    ? "#fff"
                    : "#2E7D32",

                borderColor:
                  cloudGameData.FirstRow != undefined &&
                  cloudGameData.FirstRow[0] === true
                    ? "#2E7D32"
                    : "#fff",
              },
            ]}
            onPress={() => ClaimFirstRow()}
          >
            <Text
              style={[
                styles.claimBtnText,
                {
                  color:
                    cloudGameData.FirstRow != undefined &&
                    cloudGameData.FirstRow[0] === true
                      ? "#2E7D32"
                      : "#fff",
                },
              ]}
            >
              First Row
            </Text>
            {cloudGameData.FirstRow != undefined &&
              cloudGameData.FirstRow[0] === true && (
                <Text
                  style={{
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 35),
                  }}
                >
                  {cloudGameData.FirstRow[1]}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.claimBtn,
              {
                backgroundColor:
                  cloudGameData.SecondRow != undefined &&
                  cloudGameData.SecondRow[0] === true
                    ? "#fff"
                    : "#2E7D32",

                borderColor:
                  cloudGameData.SecondRow != undefined &&
                  cloudGameData.SecondRow[0] === true
                    ? "#2E7D32"
                    : "#fff",
              },
            ]}
            onPress={() => ClaimSecondRow()}
          >
            <Text
              style={[
                styles.claimBtnText,
                {
                  color:
                    cloudGameData.SecondRow != undefined &&
                    cloudGameData.SecondRow[0] === true
                      ? "#2E7D32"
                      : "#fff",
                },
              ]}
            >
              Second Row
            </Text>
            {cloudGameData.SecondRow != undefined &&
              cloudGameData.SecondRow[0] === true && (
                <Text
                  style={{
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 35),
                  }}
                >
                  {cloudGameData.SecondRow[1]}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.claimBtn,
              {
                backgroundColor:
                  cloudGameData.ThirdRow != undefined &&
                  cloudGameData.ThirdRow[0] === true
                    ? "#fff"
                    : "#2E7D32",

                borderColor:
                  cloudGameData.ThirdRow != undefined &&
                  cloudGameData.ThirdRow[0] === true
                    ? "#2E7D32"
                    : "#fff",
              },
            ]}
            onPress={() => ClaimThirdRow()}
          >
            <Text
              style={[
                styles.claimBtnText,
                {
                  color:
                    cloudGameData.ThirdRow != undefined &&
                    cloudGameData.ThirdRow[0] === true
                      ? "#2E7D32"
                      : "#fff",
                },
              ]}
            >
              Third Row
            </Text>
            {cloudGameData.ThirdRow != undefined &&
              cloudGameData.ThirdRow[0] === true && (
                <Text
                  style={{
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 35),
                  }}
                >
                  {cloudGameData.ThirdRow[1]}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.claimBtn,
              {
                backgroundColor:
                  cloudGameData.FullHousie != undefined &&
                  cloudGameData.FullHousie[0] === true
                    ? "#fff"
                    : "#2E7D32",

                borderColor:
                  cloudGameData.FullHousie != undefined &&
                  cloudGameData.FullHousie[0] === true
                    ? "#2E7D32"
                    : "#fff",
              },
            ]}
            onPress={() => ClaimFullHousie()}
          >
            <Text
              style={[
                styles.claimBtnText,
                {
                  color:
                    cloudGameData.FullHousie != undefined &&
                    cloudGameData.FullHousie[0] === true
                      ? "#2E7D32"
                      : "#fff",
                },
              ]}
            >
              Full Housie
            </Text>
            {cloudGameData.FullHousie != undefined &&
              cloudGameData.FullHousie[0] === true && (
                <Text
                  style={{
                    color: "#2E7D32",
                    fontSize: Math.round(Dimensions.get("window").height / 35),
                  }}
                >
                  {cloudGameData.FullHousie[1]}
                </Text>
              )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: "14%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {cloudGameData.RandomNumbers && (
            <Numbersboard data={cloudGameData.RandomNumbers} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  claimBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 10,
    height: Math.round(Dimensions.get("window").height / 8),
    width: "90%",
  },
  claimBtnText: {
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").height / 30),
  },
  Drawnumber: {
    backgroundColor: "#ff1e56",
    marginHorizontal: 4,
    fontWeight: "bold",
    fontSize: Math.round(Dimensions.get("window").width / 45),
    color: "#fff",
    borderRadius: 100,
    height: Math.round(Dimensions.get("window").width / 20),
    width: Math.round(Dimensions.get("window").width / 20),
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default GamePage;
