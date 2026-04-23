import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function GerenciarTurma({ navigation }) {

  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [searchNome, setSearchNome] = useState("");
  const [searchProfessor, setSearchProfessor] = useState("");


  async function carregarDados() {
    try {
      const respTurmas = await api.getClasses();
      setTurmas(respTurmas.data.classes);
      const respProfs = await api.getInstructors();
      setProfessores(respProfs.data.instructors);
    } catch (error) {
    }
  }


  useEffect(() => {
    carregarDados();
  }, []);

  async function pesquisar() {
    try {
      if (searchNome !== "") {
        // Se o cara digitou um nome, busca por nome
        const response = await api.getClassByName(searchNome);
        setTurmas(response.data.classes);
      } else {

        carregarDados();
      }
    } catch (error) {
      Alert.alert("Aviso", "Nenhuma turma encontrada!");
      setTurmas([]);
    }
  }


  function renderItem({ item }) {
    return (
      <View style={styles.turmaListItem}>
        <Text style={styles.turmaItemTextNome}>{item.name}</Text>
        <Text style={styles.turmaItemTextProf}>{item.instructor_name}</Text>

        <TouchableOpacity style={styles.turmaItemAcaoContainer}>
          <MaterialIcons name="more-vert" size={20} color="#555" />
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />

      <View style={styles.pageContent}>
        <View style={styles.turmaHeaderContainer}>
          <Text style={styles.turmaTitle}>Gerenciar Turmas</Text>
        </View>

        <TouchableOpacity
          style={styles.turmaBtnAdicionar}
          onPress={() => navigation.navigate("EditarTurmas")}
        >
          <Text style={styles.turmaBtnAdicionarText}>Adicionar Turma</Text>
          <Feather name="plus-circle" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.turmaFilterRow}>
          <TextInput
            style={styles.turmaInputNome}
            placeholder="Nome da Turma"
            value={searchNome}
            onChangeText={setSearchNome}
          />

          <View style={{ borderWidth: 0.3, borderRadius: 8, height: 45, justifyContent: "center", overflow: "hidden", width: "49%", marginRight: 5 }}>
            <Picker
              selectedValue={searchProfessor}
              onValueChange={(itemValue) => setSearchProfessor(itemValue)}
              style={{ height: 45 }}
            >
              <Picker.Item label="Professor" value="" />
              {professores.map((prof) => (
                <Picker.Item key={prof.id_instructor} label={prof.name} value={prof.name} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.turmaBtnSearch} onPress={() => { pesquisar() }}>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.turmaListHeader}>
          <Text style={styles.turmaListHeaderTextNome}>Nome</Text>
          <Text style={styles.turmaListHeaderTextProf}>Professor</Text>
          <Text style={styles.turmaListHeaderTextAcao}>Ação</Text>
        </View>

        <FlatList
          data={turmas}
          keyExtractor={(item) => String(item.id_class)}
          renderItem={renderItem}
          onPress={() => navigation.navigate("EditarTurmas", { turma: item })}
        />
      </View>
    </View>
  );
}

