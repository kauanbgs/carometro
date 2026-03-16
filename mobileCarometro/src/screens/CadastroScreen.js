import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";

export default function CadastroUser({ navigation }) {
  const [docente, setDocente] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  
  function onChange(name, value) {
    setDocente({ ...docente, [name]: value });
  }

  async function Cadastro() {
    try {
      const response = await api.postCadastro(docente);
      Alert.alert(response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert(error.response.data.error);
      console.log(error.response?.data);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={32} color="#333" />
        </TouchableOpacity>

        <Image
          source={require("../../image/LogoCarometro-v2.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Criando Docente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#bababa"
        value={docente.nome}
        onChangeText={(value) => onChange("nome", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Educacional"
        placeholderTextColor="#bababa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={docente.email}
        onChangeText={(value) => onChange("email", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#bababa"
        secureTextEntry={true}
        value={docente.senha}
        onChangeText={(value) => onChange("senha", value)}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={docente.tipo}
          onValueChange={(itemValue) => onChange("tipo", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tipo" value="" color="#bababa"/>
          <Picker.Item label="Docente" value="doc" />
          <Picker.Item label="Administrador" value="adm" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.buttonCriar} onPress={Cadastro}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#2957a4",
    fontStyle: "italic",
  },
  logo: {
    width: 100,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 25,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "#333",
  },
  buttonCriar: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 25,
    justifyContent: "center",
  },
  picker: {
    width: "100% + (10%)", // Adicionei o 10% para mexer a setinha para a direita (alinhar)
    height: 45,
    color: "#bababa",
    marginLeft: -3, 
    padding: 27
  }
});
