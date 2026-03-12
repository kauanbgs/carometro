import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import api from "../services/api";

export default function Login({ navigation }) {
  const [user, setUser] = useState({ email: "", senha: "" });

  function onChange(name, value) {
    setUser({ ...user, [name]: value });
  }

  async function login() {
    try {
      const response = await api.postLogin(user);
      Alert.alert(response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert(error.response.data.error);
      console.log(error.response.data.error);
    }
  }
  async function cadastrar() {
    navigation.navigate("cadastroUser");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={user.cpf}
        onChangeText={(value) => onChange("cpf", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={user.senha}
        onChangeText={(value) => onChange("senha", value)}
      />
      <TouchableOpacity style={styles.buttonEntrar} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCadastro} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonEntrar: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonCadastro: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
