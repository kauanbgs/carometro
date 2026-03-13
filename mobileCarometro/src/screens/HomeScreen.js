import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home( { navigation } ) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          style={styles.botaosidebar}
          name="bars"
          size={40}
          color="black"
        />
        <Image />
      </View>
      <View style={styles.content}>
        <Text style={styles.titulo}>
          Deseja <Text style={styles.editar}>editar</Text> uma{"\n"}
          turma?
        </Text>
        <Text style={styles.texto}>
          Alguma nova notificação ou{"\n"}alteração na turma? gerencie{"\n"}agora!
        </Text>

        <TouchableOpacity style={styles.botoes} onPress={() => navigation.navigate("Suporte")}>
          <Text style={styles.buttonText}>Clique aqui e comece</Text>
        </TouchableOpacity>
        <View style={styles.linhaFinaPreta}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    paddingTop: "20",
    height: "150",
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // AQUI QUE COMEÇA A ESTILIZAÇÃO
  // Header
  botaosidebar: {
    flex:1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop:30
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },

  // Conteudo
  titulo: {
    fontSize: 40,
    fontWeight: "100",
    textAlign: "left",
    flexDirection: "row"
  },
  editar: {
    color: "orange",
  },
  texto: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 3,
  },
  botoes: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: "black",
    height: 50,
    width: 150,
  },
  buttonText: {
    width: 270,
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    backgroundColor: "#DF804D",
    color: "black",
    padding: 10,
    marginTop: 30,
    marginLeft: 160
  },
  linhaFinaPreta: {
    width: 240,
    height: 1.3,
    backgroundColor: "black",
    marginTop: 70,
    marginLeft: 40
  }
});
