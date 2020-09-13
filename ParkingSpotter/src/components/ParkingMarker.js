import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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

export default function ParkingMarker({ percentage, wheelchair, electric }) {
  const scaleAnimated = new Animated.Value(0);

  useEffect(() => {
    console.log(Math.random());
  }, []);

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
      <View style={styles.iconPanel}>
        {wheelchair && (
          <>
            <View style={{ ...styles.icon, backgroundColor: "#00f" }}>
              <FontAwesome5
                name="wheelchair"
                size={16}
                color="white"
                style={styles.wheelchair}
              />
            </View>
            {electric && <View style={styles.spacer} />}
          </>
        )}
        {electric && (
          <View style={{ ...styles.icon, backgroundColor: "orange" }}>
            <FontAwesome5
              name="bolt"
              size={16}
              color="white"
              style={styles.bolt}
            />
          </View>
        )}
      </View>
      <Text
        style={{
          ...styles.percentage,
          marginTop: wheelchair || electric ? 0 : 12
        }}
      >
        {percentage}%
      </Text>
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
    marginTop: 5
  },
  iconPanel: {
    flexDirection: "row",
    marginTop: -25,
    justifyContent: "center"
  },
  icon: {
    height: 20,
    width: 20,
    color: "#fff",
    borderRadius: 10
  },
  wheelchair: {
    left: 2,
    top: 2
  },
  spacer: {
    width: 10
  },
  bolt: {
    left: 5,
    top: 2
  },
  percentage: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800"
  }
});
