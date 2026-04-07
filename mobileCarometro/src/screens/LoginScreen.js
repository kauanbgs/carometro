import { TouchableOpacity, View, Text, TextInput, Alert, Image } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import api from "../services/api";
import styles from "../components/Styles";

export default function Login({ navigation }) {
  const [instructor, setInstructor] = useState({ email: "", password: "" });
  const [lembrarMe, setLembrarMe] = useState(false);

  function onChange(name, value) {
    setInstructor({ ...instructor, [name]: value });
  }

  async function login() {
    try {
      const response = await api.postLogin(instructor);
      Alert.alert(response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert(error.response.data.error);
      console.log(error.response.data);
    }
  }

  return (
    <>
      <View style={styles.loginHeader}>
        <Image
          source={require("../../image/LogoCarometro-v2.png")}
          style={styles.loginLogo}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Olá! Já Tem {"\n"}Uma Conta?</Text>

        <TextInput
          style={styles.formInput}
          placeholder="Email Educacional"
          placeholderTextColor="#bababa"
          value={instructor.email}
          onChangeText={(value) => onChange("email", value)}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Senha"
          placeholderTextColor="#bababa"
          secureTextEntry
          value={instructor.password}
          onChangeText={(value) => onChange("password", value)}
        />

        <TouchableOpacity
          style={styles.loginCheckboxContainer}
          activeOpacity={0.8}
          onPress={() => setLembrarMe(!lembrarMe)}
        >
          <Checkbox
            style={styles.loginCheckbox}
            value={lembrarMe}
            onValueChange={setLembrarMe}
            color={"#2957a4"}
          />
          <Text style={styles.loginCheckboxLabel}>Lembrar de mim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButtonEntrar} onPress={login}>
          <Text style={styles.buttonWhiteText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.loginFooterText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Suporte")}>
            <Text style={styles.loginLinkText}>Cadastre-se!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
