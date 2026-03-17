import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  Platform, // Importado para diferenciar iOS de Android
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import useSideBar from "../utils/onChangeSideBar";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CadastroUser({ navigation }) {
  const [docente, setDocente] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
  });

  const { sidebar, abrirSidebar } = useSideBar(navigation);

  function onChange(name, value) {
    setDocente({ ...docente, [name]: value });
  }

  async function Cadastro() {
    if (!docente.nome || !docente.email || !docente.senha || !docente.tipo) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.postCadastro(docente);
      Alert.alert("Sucesso", response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.error || "Erro ao cadastrar");
      console.log(error.response?.data);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {sidebar}

        <View style={styles.header}>
          <TouchableOpacity style={styles.botaosidebar} onPress={abrirSidebar}>
            <AntDesign name="bars" size={40} color="black" />
          </TouchableOpacity>
          <Image
            source={require("../../image/LogoCarometro-v2.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.content}>
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

          {/* Container do Picker com estilização condicional */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabel}>Tipo de Usuário:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={docente.tipo}
                onValueChange={(itemValue) => onChange("tipo", itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem} // Estilo específico para itens no iOS
              >
                <Picker.Item label="Selecione..." value="" color="#bababa" />
                <Picker.Item label="Docente" value="doc" />
                <Picker.Item label="Administrador" value="adm" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonCriar} onPress={Cadastro}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  botaosidebar: {
    marginLeft: 10,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginRight: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
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
    fontSize: 16,
    color: "#333",
  },
  pickerWrapper: {
    marginBottom: 25,
  },
  pickerLabel: {
    fontSize: 14,
    color: "#bababa",
    marginBottom: 5,
  },
  pickerContainer: {
    width: "100%",
    ...Platform.select({
      ios: {
        backgroundColor: "#f2f2f7",
        borderRadius: 10,
        overflow: "hidden",
      },
      android: {
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
      },
    }),
  },
  picker: {
    width: "100%",
    ...Platform.select({
      ios: {
        height: 150, // Altura necessária para a roda do iOS
      },
      android: {
        height: 50,
        color: "#333",
      },
    }),
  },
  pickerItem: {
    fontSize: 16, // Apenas para iOS
    height: 150,
  },
  buttonCriar: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});