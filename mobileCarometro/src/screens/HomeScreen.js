import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function Home({ navigation }) {
  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />

      <View style={styles.pageContent}>
        <Text style={styles.titleMedium}>
          Deseja <Text style={styles.textHighlight}>editar</Text> uma{"\n"}turma?
        </Text>

        <Text style={styles.textNormal}>
          Alguma nova notificação ou{"\n"}alteração na turma? gerencie{"\n"}agora!
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Suporte")}
        >
          <Text style={styles.buttonWhiteText}>Clique aqui e comece</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.titleMedium}>
          Pronto para <Text style={styles.textHighlight}>criar</Text>{"\n"}uma turma?
        </Text>

        <Text style={styles.textNormal}>
          Usuários com permissão de{"\n"}administrador podem editar{"\n"}e/ou criar turmas.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Suporte")}
        >
          <Text style={styles.buttonWhiteText}>Clique aqui e comece</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer} />
    </View>
  );
}