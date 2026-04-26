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
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function DeleteDocente({ navigation }) {
  const [instructor, setInstructor] = useState({
    email: "",
    password: "",
  });
  const [modalVisivel, setModalVisivel] = useState(false);
  

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
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />

      <View style={styles.pageContent}>
        <Text style={styles.titleMedium}>Removendo Docente</Text>

        <TextInput
          style={styles.input}
          placeholder="Email do docente"
          placeholderTextColor="#bababa"
          value={instructor.email}
          onChangeText={(value) => onChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha Docente"
          placeholderTextColor="#bababa"
          
          value={instructor.password}
          onChangeText={(value) => onChange("password", value)}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={()=> setModalVisivel(true)}>
          <Text style={styles.buttonWhiteText}>Remover</Text>
        </TouchableOpacity>
        <ConfirmDeleteModal 
          visible={modalVisivel} 
          onClose={() => setModalVisivel(false)} 
          onConfirm={Delete} 
        />
      </View>
    </View>
  );
}
