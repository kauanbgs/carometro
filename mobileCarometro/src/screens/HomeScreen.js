import React from "react";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
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
            source={require("../../image/SenaiLogo.png")}
            style={styles.logo}
          />
      </View>
      <View style={styles.content}>
        <Text style={styles.titulo}>
          Deseja <Text style={styles.editar}>editar</Text> uma{"\n"}
          turma?
        </Text>
        <Text style={styles.texto}>
          Alguma nova notificação ou alteração na turma? gerencie agora!
        </Text>

        <TouchableOpacity style={styles.botoes} onPress={"/"}>
          <Text style={styles.buttonText}>Clique aqui e comece</Text>
        </TouchableOpacity>

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
    marginLeft: "20",
    marginRight: "50%",
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },

  // Conteudo
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  editar: {
    color: "orange",
  },
  texto: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 20,
  },
  botoes: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    color: "black",
    height: 50,
    width: 150
  }
});
