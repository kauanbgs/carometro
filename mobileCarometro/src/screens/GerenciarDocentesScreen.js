import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function GerenciarDocentes({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Header navigation={navigation} />

      <View style={styles.homeContent}>
        <View>
          <Text style={styles.titulo}>Adicionar Docente</Text>
          <Text style={styles.texto}>Deseja adicionar um administrador?</Text>
          <TouchableOpacity style={styles.cadastroButtonCriar} onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.buttonWhiteText}>Criar</Text>
          </TouchableOpacity>
          <View style={{
            width: "80%",
            height: 1.6,
            backgroundColor: "gray",
            marginTop: 34,
            marginBottom: 50,
            alignSelf: "center",
          }}></View>
        </View>

        <View>
          <Text style={styles.titulo}>Remover Docente</Text>
          <Text style={styles.texto}>Deseja remover um administrador?</Text>
          <TouchableOpacity style={styles.cadastroButtonCriar} onPress={() => navigation.navigate("Delete")}>
            <Text style={styles.buttonWhiteText}>Remover</Text>
          </TouchableOpacity>
          <View style={{
            width: "80%",
            height: 1.6,
            backgroundColor: "gray",
            marginTop: 34,
            marginBottom: 50,
            alignSelf: "center",
          }}></View>
        </View>

        <View>
          <Text style={styles.titulo}>Ir para o Suporte</Text>
          <Text style={styles.texto}>Deseja ir para o suporte?</Text>
          <TouchableOpacity style={styles.cadastroButtonCriar} onPress={() => navigation.navigate("Suporte")}>
            <Text style={styles.buttonWhiteText}>Ir para o Suporte</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer} />
    </View>
  );
}