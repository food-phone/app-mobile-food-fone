import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncImageAnimated,
  Image,
  TouchableHighlight
} from "react-native";
//import styles from "./styles";

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={require("../../../assets/icons/cookie100.png")}
        />
      </View>
    );
  }
}
