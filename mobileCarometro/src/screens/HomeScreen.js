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

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          style={styles.botaosidebar}
          name="bars"
          size={40}
          color="black"
        />
        <Image
          source={require("../../image/LogoCarometro-v2.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.titulo}>
          Deseja <Text style={styles.editar}>editar</Text> uma{"\n"}
          turma?
        </Text>

        <Text style={styles.texto}>
          Alguma nova notificação ou{"\n"}alteração na turma? gerencie{"\n"}
          agora!
        </Text>

        <TouchableOpacity
          style={styles.botoes}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.buttonText}>Clique aqui e comece</Text>
        </TouchableOpacity>

        <View style={styles.linhaFinaPreta}></View>

        <Text style={styles.titulo}>
          Pronto para <Text style={styles.editar}>criar</Text> {"\n"}uma turma?
        </Text>

        <Text style={styles.texto}>
          Usuários com permissão de{"\n"}administrador podem editar{"\n"}e/ou
          criar turmas.
        </Text>

        <TouchableOpacity
          style={styles.botoes}
          onPress={() => navigation.navigate("Suporte")}
        >
          <Text style={styles.buttonText}>Clique aqui e comece</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}></View>
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
    paddingRight: 25,
    paddingTop: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // AQUI QUE COMEÇA A ESTILIZAÇÃO
  // Header
  botaosidebar: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 15,
    marginRight: 15,
  },

  // Conteudo
  titulo: {
    marginTop: -20,
    fontSize: 34,
    fontWeight: "100",
    textAlign: "left",
    flexDirection: "row",
  },
  editar: {
    color: "orange",
  },
  texto: {
    fontWeight: "normal",
    marginTop: 15,
    fontSize: 20,
    textAlign: "left",
  },
  buttonText: {
    width: 250,
    height: 50,
    fontWeight: "bold",
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    backgroundColor: "#f0854cff",
    color: "#000000a8",
    padding: 11,
    marginTop: 30,
    marginLeft: 20,
  },
  linhaFinaPreta: {
    width: 225,
    height: 1.6,
    backgroundColor: "gray",
    marginTop: 34,
    marginBottom: 50,
    marginLeft: 33,
  },

  // FOOTER
  footer: {
    height: 50,
    backgroundColor: "lightcoral",
  },
});
