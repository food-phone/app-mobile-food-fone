import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import styles from "./styles";
import { categories, carrinhoDeCompras } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";

import api from "../../services/api";

let valores = [];
export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompra: "",
      usuarioSessao: ""
    };
  }

  static navigationOptions = {
    title: "Carrinho de Compras",
    headerStyle: {
      backgroundColor: "#682dce"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    }
  };

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.props.navigation.navigate("RecipesList", { category, title });
  };

  componentDidMount() {
    if (carrinhoDeCompras.length > 0) {
      for (let i = 0; i < carrinhoDeCompras.length; i++) {
        const element = carrinhoDeCompras[i];
        let convertValue = parseFloat(element.preco);
        valores.push(convertValue);
      }

      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      this.setState({ totalCompra: valores.reduce(reducer).toFixed(2) });
    }
  }

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.cartItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.fotoUrl }} />
        <Text style={styles.categoriesName}>{item.nomeProduto}</Text>
        <Text style={styles.categoriesName}>R$ {item.preco}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.infoContainer}>
            <Text
              style={{
                fontSize: 28,
                margin: 10,
                fontWeight: "bold",
                color: "black",
                textAlign: "center"
              }}
            >
              Total a pagar: R$ {this.state.totalCompra}
            </Text>
          </View>
          <View>
            <ViewIngredientsButton
              onPress={() => {
                ToastAndroid.show(
                  `Aguarde enquanto validamos a sua compra...`,
                  ToastAndroid.LONG
                );
                AsyncStorage.getItem("usuario")
                  .then(async r => {
                    for (let i = 0; i < carrinhoDeCompras.length; i++) {
                      const element = carrinhoDeCompras[i];

                      await api.post("/compras", {
                        cep: "",
                        endereco: "",
                        prato: element.nomeProduto,
                        preco: element.preco,
                        usuario: r
                      });
                    }

                    carrinhoDeCompras.length = 0;
                    valores.length = 0;
                    navigation.navigate("Shopping");
                  })
                  .catch(err => {
                    console.log("Deu ruim", err);
                  });
              }}
              nome={"Finalizar a compra"}
            />
          </View>
          <View>
            <ViewIngredientsButton
              onPress={() => {
                carrinhoDeCompras.length = 0;
                valores.length = 0;

                navigation.navigate("Home");

                ToastAndroid.show(`Compra Cancelada`, ToastAndroid.LONG);
              }}
              nome={"Cancelar compra"}
            />
          </View>
          <View>
            <FlatList
              data={carrinhoDeCompras}
              renderItem={this.renderCategory}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
