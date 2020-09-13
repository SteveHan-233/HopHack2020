import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Modal, Text } from "react-native";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { lot1CarPos } from "../const";
import Car from "./Car";

const delay = ms => new Promise(res => setTimeout(res, ms));

export default ({ modalOpen, setModalOpen, setCurrLot, lotData, carData }) => {
  const [cars, setCars] = useState([]);

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
        <View style={styles.header}>
          <Text style={styles.lotName}>{lotData ? lotData.name : ""}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setModalOpen(false);
              setCurrLot(null);
            }}
          >
            <Ionicons name="ios-close-circle" size={30} color="#66aadb" />
          </TouchableOpacity>
        </View>
        <Image source={require("../../assets/lot1.png")} style={styles.lot} />
        {carData !== null &&
          carData.map((car, ind) => {
            if (!car) return <Car ind={ind} />;
            else return <></>;
          })}
        {/* <Car ind={0} /> */}
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
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  lotName: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
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
  }
});
