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
import styles from "../components/Styles";

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
<<<<<<< HEAD
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>

      <View style={styles.pageContent}>
        <Text style={styles.titleMedium}>Removendo Docente</Text>

=======
    <View style={styles.deleteContainer}>

        <Header navigation={navigation} />
  
      <View style={styles.deleteContainer}>
        <Text style={styles.title}>Removendo Docente</Text>
>>>>>>> 2550a1ec5a91c52110a5addf56e7791ce3435309
        <TextInput
          style={styles.input}
          placeholder="Email do docente"
          placeholderTextColor="#bababa"
          value={instructor.email}
          onChange={(value) => onChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha Docente"
          placeholderTextColor="#bababa"
          
          value={instructor.password}
          onChange={(value) => onChange("password", value)}
        />
<<<<<<< HEAD

        <TouchableOpacity style={styles.primaryButton} onPress={Delete}>
          <Text style={styles.buttonWhiteText}>Remover</Text>
        </TouchableOpacity>
      </View>
=======
        <TouchableOpacity style={styles.buttonDelete} onPress={Delete}>
        <Text style={styles.buttonText}>Remover</Text>
      </TouchableOpacity>
      </View>
      
>>>>>>> 2550a1ec5a91c52110a5addf56e7791ce3435309
    </View>
  );
}
