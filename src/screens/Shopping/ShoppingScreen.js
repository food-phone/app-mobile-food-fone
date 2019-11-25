import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import BackButton from "../../components/BackButton/BackButton";
import logo from "../../../assets/check.png";

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#682dce"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerTransparent: "true",
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} />
        <Text style={styles.textShopping}>Compra realizada com sucesso!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  textShopping: {
    fontSize: 28,
    margin: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  }
});
