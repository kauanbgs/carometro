import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Header navigation={navigation} />

      <View style={styles.homeContent}>
        <Text style={styles.homeTitulo}>
          Deseja <Text style={styles.homeEditar}>editar</Text> uma{"\n"}turma?
        </Text>

        <Text style={styles.homeTexto}>
          Alguma nova notificação ou{"\n"}alteração na turma? gerencie{"\n"}agora!
        </Text>

        <TouchableOpacity
          style={styles.homeBotoes}
          onPress={() => navigation.navigate("Suporte")}
        >
          <Text style={styles.homeButtonText}>Clique aqui e comece</Text>
        <View style={styles.homeLinhaFinaPreta} />
        </TouchableOpacity>


        <Text style={styles.homeTitulo}>
          Pronto para <Text style={styles.homeEditar}>criar</Text>{"\n"}uma turma?
        </Text>

        <Text style={styles.homeTexto}>
          Usuários com permissão de{"\n"}administrador podem editar{"\n"}e/ou criar turmas.
        </Text>

        <TouchableOpacity
          style={styles.homeBotoes}
          onPress={() => navigation.navigate("Suporte")}
        >
          <Text style={styles.homeButtonText}>Clique aqui e comece</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeFooter} />
    </View>
  );
}