import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SCALE = {
  getScaleTransformationStyle(animated, startSize = 1, endSize = 0.95) {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, endSize]
    });
    return {
      transform: [{ scale: interpolation }]
    };
  },
  pressInAnimation(animated, duration = 500) {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start();
  },
  pressOutAnimation(animated, duration = 500) {
    animated.setValue(1);
    Animated.timing(animated, {
      toValue: 0,
      duration,
      useNativeDriver: true
    }).start();
  }
};

export default function ParkingMarker({ percentage }) {
  const scaleAnimated = new Animated.Value(0);

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        SCALE.getScaleTransformationStyle(scaleAnimated)
      ]}
      onPressIn={() => {
        SCALE.pressInAnimation(scaleAnimated);
      }}
      onPressOut={() => {
        SCALE.pressOutAnimation(scaleAnimated);
      }}
      activeOpacity={1}
    >
      <Ionicons name="ios-car" size={50} color="white" style={styles.caricon} />
      <Text style={styles.percentage}>{percentage}%</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#66aadb"
  },
  caricon: {
    marginLeft: 20,
    marginTop: 10
  },
  percentage: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    marginTop: -15
  }
});
