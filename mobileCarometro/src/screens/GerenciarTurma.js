import React, {useState} from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function GerenciarTurma({ navigation }) {
  return (
    <>
      <View style={styles.homeContainer}>
        <Header navigation={navigation} />
        <View style={styles.homeContainer}>
          <Text style={styles.titulo}>Gerenciar Turma</Text>

          <TouchableOpacity
            style={adicionarTurmaButton}
            onPress={() => navigation.navigate("")}
          >
            <Text style={styles.buttonGreyText}>Adicionar Turma</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.formInput}
            placeholder="Nome da turma"
            placeholderTextColor={"#bababa"}
            // value={}
            // onChange={(value)=>onChange()}
          />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              ></KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
}
