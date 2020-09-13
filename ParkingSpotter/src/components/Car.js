import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { lot1CarPos } from "../const";

export default function Car({ ind }) {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <Image
      style={{ ...styles.car, ...lot1CarPos[ind] }}
      source={require("../../assets/car-top.png")}
      key={ind}
    />
  );
}

const styles = StyleSheet.create({
  car: {
    position: "absolute",
    height: 30,
    width: 60
  }
});
