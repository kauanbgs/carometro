import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import  api from "../services/api"

export default function Login({navigation}) {
  const [user, setUser] = useState({ cpf: "", senha: "" });

  function onChange(name, value) {
    setUser({ ...user, [name]: value });
  }

  async function login(){
    try{
      const response = await api.postLogin(user);
      Alert.alert(response.data.message);
    } catch (error) {
      Alert.alert(error.response.data.error)
      console.log(error.response.data.error)
    }
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
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});