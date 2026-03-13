import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import api from "../services/api";

export default function Login({ navigation }) {
  const [docente, setDocente] = useState({ email: "", senha: "" });
  const [lembrarMe, setLembrarMe] = useState(false);

  function onChange(name, value) {
    setDocente({ ...docente, [name]: value });
  }

  async function login() {
    try {
      const response = await api.postLogin(docente);
      Alert.alert(response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert(error.response.data.error);
      console.log(error.response.data);
    }
  }
  //   async function cadastrar() {
  //     navigation.navigate("cadastroUser");
  //   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá! Já Tem {"\n"}Uma Conta?</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Educacional"
        placeholderTextColor="#bababa"
        value={docente.email}
        onChangeText={(value) => onChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#bababa"
        value={docente.senha}
        onChangeText={(value) => onChange("senha", value)}
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        activeOpacity={0.8}
        onPress={() => setLembrarMe(!lembrarMe)}
      >
        <Checkbox
          style={styles.checkbox}
          value={lembrarMe}
          onValueChange={setLembrarMe}
          color={"#2957a4"}
        />
        <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEntrar} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Suporte")}>
          <Text style={styles.linkText}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "100",
    marginRight: 70,
    marginBottom: 30,
    color: "#2957a4",
    width: "260",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonEntrar: {
    alignItems: "center",
    width: 320,
    backgroundColor: "#2957a4",
    padding: 10,
    borderRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#bababa",
    fontSize: 16,
  },
  checkboxContainer: {
    color: "#333",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    left: -85
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  footerText: {
    color: "#bababa",
    fontSize: 16,
  },
  linkText: {
    color: "#333",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});