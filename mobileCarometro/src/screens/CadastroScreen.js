import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, Alert, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function CadastroUser({ navigation }) {
  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  function onChange(name, value) {
    setInstructor({ ...instructor, [name]: value });
  }

  async function Cadastro() {
    if (!instructor.name || !instructor.email || !instructor.password || !instructor.type) {
      Alert.alert("Erro", "All fields must be filled");
      return;
    }
    try {
      const response = await api.postCadastro(instructor);
      Alert.alert("Sucesso", response.data.message);
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.error);
      console.log(error.response?.data);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.cadastroContainer}>
        <Header navigation={navigation} />

        <View style={styles.cadastroContent}>
          <Text style={styles.formTitle}>Criando Docente</Text>

          <TextInput
            style={styles.cadastroInput}
            placeholder="Nome"
            placeholderTextColor="#bababa"
            value={instructor.name}
            onChangeText={(value) => onChange("name", value)}
          />

          <TextInput
            style={styles.cadastroInput}
            placeholder="Email Educacional"
            placeholderTextColor="#bababa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={instructor.email}
            onChangeText={(value) => onChange("email", value)}
          />

          <TextInput
            style={styles.cadastroInput}
            placeholder="Senha"
            placeholderTextColor="#bababa"
            secureTextEntry={true}
            value={instructor.password}
            onChangeText={(value) => onChange("password", value)}
          />

          {/* Container do Picker com estilização condicional */}
          <View style={styles.cadastroPickerWrapper}>
            <Text style={styles.cadastroPickerLabel}>Tipo de Usuário:</Text>
            <View style={styles.cadastroPickerContainer}>
              <Picker
                selectedValue={instructor.type}
                onValueChange={(itemValue) => onChange("type", itemValue)}
                style={styles.cadastroPicker}
                itemStyle={styles.cadastroPickerItem}
              >
                <Picker.Item label="Selecione..." value="" color="#bababa" />
                <Picker.Item label="Docente" value="inst" />
                <Picker.Item label="Administrador" value="adm" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.cadastroButtonCriar} onPress={Cadastro}>
            <Text style={styles.buttonWhiteText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}