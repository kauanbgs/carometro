import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  Platform, 
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import Header from "../components/Header";

export default function DeleteDocente({ navigation }) {
  const [instructor, setInstructor] = useState({
    email: "",
    password: "",
  });

  function onChange(email, value) {
    setInstructor({ ...instructor, [email]: value });
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
    <>
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Removendo Docente</Text>
        <TextInput
          style={styles.input}
          placeholder="Email do docente"
          placeholderTextColor="#bababa"
          value={instructor.email}
          onChange={(value) => onChange("email", value)}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Senha Docente"
          placeholderTextColor="#bababa"
          
          value={instructor.password}
          onChange={(value) => onChange("password", value)}
        />
      </View>
      <TouchableOpacity style={styles.buttonDelete} onPress={Delete}>
        <Text style={styles.buttonText}>Remover</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({

    title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
 input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  
    buttonDelete: {
    alignItems: "center",
    color:"#fff",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText:{
    color:"#fff"
  }
})