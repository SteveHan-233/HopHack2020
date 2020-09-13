import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Modal, Text } from "react-native";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { lot1CarPos } from "../const";

// Used to test random placement of cars
// const genRandCars = () => {
//   const cars = [];
//   for (let i = 0; i < carPos.length; i++) {
//     cars.push(Math.random() >= 0.5);
//   }
//   return cars;
// };

const delay = ms => new Promise(res => setTimeout(res, ms));

export default ({ modalOpen, setModalOpen }) => {
  const [cars, setCars] = useState([]);

  useEffect(async () => {
    const f = require("./precompute.json");
    for (arr of f) {
      console.log(arr);
      setCars(arr);
      await delay(1000);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      style={styles.modal}
    >
      <BlurView tint="light" intensity={100} style={styles.blur}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setModalOpen(false)}
        >
          <Ionicons name="ios-close-circle" size={30} color="#500000" />
        </TouchableOpacity>
        <Image source={require("../../assets/lot1.png")} style={styles.lot} />
        {cars.map((car, ind) => {
          if (!car)
            return (
              <Image
                source={require("../../assets/car-top.png")}
                style={{ ...styles.car, ...lot1CarPos[ind] }}
                key={ind}
              />
            );
          else return <></>;
        })}
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 50
  },
  blur: {
    marginTop: 280,
    height: "70%",
    borderRadius: 50,
    padding: 25
  },
  icon: {
    marginLeft: "auto"
  },
  lot: {
    height: "80%",
    width: "100%",
    resizeMode: "contain",
    marginTop: 20,
    position: "relative"
  },
  car: {
    position: "absolute",
    height: 30,
    width: 60
  }
});
