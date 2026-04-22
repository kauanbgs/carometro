import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../components/Styles";

export default function GerenciarDocente({ navigation }) {
  const [docentes, setDocentes] = useState([]);
  const [docentesTotais, setDocentesTotais] = useState([]); // Guarda a lista completa para o filtro de ID
  const [searchNome, setSearchNome] = useState("");
  const [searchId, setSearchId] = useState("");

  async function carregarDados() {
    try {
      const respDocentes = await api.getInstructors();
      setDocentes(respDocentes.data.instructors);
      setDocentesTotais(respDocentes.data.instructors); 
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar os dados dos docentes.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function pesquisar() {
    try {
      if (searchId !== "") {
        
        const filtrado = docentesTotais.filter(d => String(d.id_instructor) === searchId);
        setDocentes(filtrado);
        
        if (filtrado.length === 0) {
          Alert.alert("Aviso", "Nenhum docente encontrado com este ID!");
        }
      } else if (searchNome !== "") {
        // Se digitou um nome, busca na API
        const response = await api.getInstructorByName(searchNome);
        setDocentes(response.data.instructor); 
      } else {
        // Se deixou tudo vazio e clicou na lupa, recarrega a lista
        carregarDados();
      }
    } catch (error) {
      Alert.alert("Aviso", "Nenhum docente encontrado!");
      setDocentes([]);
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.turmaListItem}>
        <Text style={styles.turmaItemTextNome}>{item.name}</Text>
        <Text style={styles.turmaItemTextProf}>{item.id_instructor}</Text>

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
          <Text style={styles.turmaTitle}>Gerenciar Docentes</Text>
        </View>

        <TouchableOpacity
          style={styles.turmaBtnAdicionar}
          onPress={() => navigation.navigate("Cadastro")} 
        >
          <Text style={styles.turmaBtnAdicionarText}>Adicionar docente</Text>
          <Feather name="plus-circle" size={18} color="#888" />
        </TouchableOpacity>


        <View style={styles.turmaFilterRow}>
          
          <TextInput
            style={[styles.turmaInputNome, { width: '45%' }]} 
            placeholder="Nome"
            value={searchNome}
            onChangeText={(texto) => {
              setSearchNome(texto);
              setSearchId(""); 
            }}
          />

          <TextInput
            style={[styles.turmaInputNome, { width: '38%', marginRight: 5 }]} 
            placeholder="ID"
            value={searchId}
            keyboardType="numeric" 
            onChangeText={(texto) => {
              setSearchId(texto);
              setSearchNome(""); 
            }}
          />

          <TouchableOpacity style={styles.turmaBtnSearch} onPress={() => pesquisar()}>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>


        <View style={styles.turmaListHeader}>
          <Text style={styles.turmaListHeaderTextNome}>Nome</Text>
          <Text style={styles.turmaListHeaderTextProf}>ID</Text>
          <Text style={styles.turmaListHeaderTextAcao}>Ação</Text>
        </View>

        <FlatList
          data={docentes}
          keyExtractor={(item) => String(item.id_instructor)}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}