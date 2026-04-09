import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function DeleteDocente({ navigation }) {
  const [instructor, setInstructor] = useState({
    email: "",
    password: "",
  });

  function onChange(field, value) {
    setInstructor({ ...instructor, [field]: value });
  }

  async function Delete() {
    if (!instructor.email || !instructor.password) {
      Alert.alert("Erro", "All fields must be filled");
      return;
    }
    try {
      const response = await api.DeleteDocente(instructor);
      Alert.alert("Sucesso", response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.error);
      console.log(error.response?.data);
    }
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.pageContent}>
        <Text style={styles.titleMedium}>Removendo Docente</Text>

        <TextInput
          style={styles.deleteInput}
          placeholder="Email do docente"
          placeholderTextColor="#bababa"
          value={instructor.email}
          onChangeText={(value) => onChange("email", value)}
        />

        <TextInput
          style={styles.formInput}
          placeholder="Senha Docente"
          placeholderTextColor="#bababa"
          secureTextEntry
          value={instructor.password}
          onChangeText={(value) => onChange("password", value)}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={Delete}>
          <Text style={styles.buttonWhiteText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}