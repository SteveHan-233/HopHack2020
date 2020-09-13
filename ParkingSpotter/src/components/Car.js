import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lot1CarPos } from "../const";
import { Tooltip } from "react-native-elements";

export default function Car({ ind }) {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    // <View
    //   style={{
    //     backgroundColor: "#f0f",
    //     borderWidth: 1,
    //     borderColor: "#f00"
    //   }}
    // >
    //   <Tooltip
    //     style={{ ...lot1CarPos[ind] }}
    //     popover={<Text>Parked here for: </Text>}
    //   >
    <Image
      style={{ ...styles.car, ...lot1CarPos[ind] }}
      source={require("../../assets/car-top.png")}
      key={ind}
    />
    //   </Tooltip>
    // </View>
  );
}

const styles = StyleSheet.create({
  car: {
    position: "absolute",
    height: 30,
    width: 60
  }
});
