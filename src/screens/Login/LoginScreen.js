import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid
} from "react-native";

import logo from "../../../assets/logo.png";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");

  async function handleLogin() {
    if (user === "") {
      ToastAndroid.show(
        `Você não preencheu o campo de usuário`,
        ToastAndroid.LONG
      );
    } else {
      await AsyncStorage.setItem("usuario", user);

      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuario"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  input: {
    height: 60,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 60,
    alignSelf: "stretch",
    backgroundColor: "#682dce",
    borderRadius: 30,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase"
  }
});
