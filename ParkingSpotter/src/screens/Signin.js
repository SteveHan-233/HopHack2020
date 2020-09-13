import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

export default ({ setAuthenticated }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/hopkins.png")} style={styles.logo} />
      <Text style={styles.title}>
        Please sign in with your John Hopkins email address to use the app
      </Text>
      <View style={styles.input}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.text_input}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.text_input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={() => setAuthenticated(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#66aadb",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40
  },
  logo: {
    width: 120,
    height: 120
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    marginBottom: 20
  },
  text_input: {
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#0d2e75",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white"
  }
});
