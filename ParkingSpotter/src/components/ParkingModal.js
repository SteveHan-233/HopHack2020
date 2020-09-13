import React from "react";
import { StyleSheet, Image, View, Modal, Text } from "react-native";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import Car from "./Car";

export default ({ modalOpen, setModalOpen, setCurrLot, lotData, carData }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
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
            if (ind == 29) return <></>;
            else if (!car && ind == 19) return <Car ind={18} />;
            else if (!car || ind == 20 || ind == 28) return <Car ind={ind} />;
            else return <></>;
          })}
        <View
          style={{
            backgroundColor: "blue",
            position: "absolute",
            top: 153,
            left: 130,
            padding: 5,
            borderRadius: 15
          }}
        >
          <FontAwesome5
            name="wheelchair"
            size={16}
            color="white"
            style={styles.wheelchair}
          />
        </View>
        <View
          style={{
            backgroundColor: "blue",
            position: "absolute",
            top: 118,
            left: 130,
            padding: 5,
            borderRadius: 15
          }}
        >
          <FontAwesome5
            name="wheelchair"
            size={16}
            color="white"
            style={styles.wheelchair}
          />
        </View>
        <View
          style={{
            backgroundColor: "blue",
            position: "absolute",
            top: 84,
            left: 130,
            padding: 5,
            borderRadius: 15
          }}
        >
          <FontAwesome5
            name="wheelchair"
            size={16}
            color="white"
            style={styles.wheelchair}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 20,
    color: "#fff",
    borderRadius: 10,
    position: "absolute",
    top: 10,
    left: 10
  },
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
