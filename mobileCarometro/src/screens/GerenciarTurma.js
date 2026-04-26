import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import styles from "../components/Styles";
import api from "../services/api";
import CriarTurmaModal from "../components/CriarTurmaModal";

export default function GerenciarTurma({ navigation }) {
  const [turmas, setTurmas] = useState([]);
  const [searchNome, setSearchNome] = useState("");
  const [searchProfessor, setSearchProfessor] = useState("");

  // 👇 ADICIONADO: Faltou criar os estados do Modal e dos Professores
  const [modalVisivel, setModalVisivel] = useState(false);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    carregarDados();
    carregarProfessores(); 
  }, []);

  const carregarDados = async () => {
    try {
      const response = await api.getClasses();
      setTurmas(response.data.classes);
    } catch (error) {
      console.log("Erro ao carregar dados", error);
    }
  };

  // 👇 ADICIONADO: Função para buscar a lista de professores no backend
  const carregarProfessores = async () => {
    try {
      // Ajuste o nome "getInstructors" para o nome que estiver no seu arquivo api.js
      const response = await api.getInstructors(); 
      setProfessores(response.data.instructors);
    } catch (error) {
      console.log("Erro ao carregar professores", error);
    }
  };

  const pesquisar = async () => {
    try {
      if (searchNome !== "") {
        const response = await api.getClassByName(searchNome);
        setTurmas(response.data.classes);
      } else if (searchProfessor !== "") {
        const response = await api.getClassByInstructorName(searchProfessor);
        setTurmas(response.data.classes);
      } else {
        carregarDados();
      }
    } catch (error) {
      Alert.alert("Aviso", "Nenhuma turma encontrada!");
      console.log(error);
      setTurmas([]);
    }
  };

  const handleCriarTurma = async (dadosTurma) => {
    try {
      await api.createClass(dadosTurma);
      setModalVisivel(false);
      carregarDados();
      Alert.alert("Sucesso", "Turma criada com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar a turma");
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />

      <View style={styles.pageContent}>
        <View style={styles.turmaHeaderContainer}>
          <Text style={styles.turmaTitle}>Gerenciar Turmas</Text>
        </View>

        {/* 👇 ALTERADO: onPress agora abre o modal */}
        <TouchableOpacity
          style={styles.turmaBtnAdicionar}
          onPress={() => setModalVisivel(true)}
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

          <View
            style={{
              borderWidth: 0.3,
              borderRadius: 8,
              height: 45,
              justifyContent: "center",
              overflow: "hidden",
              width: "33%",
              marginRight: 5,
            }}
          >
            <TextInput
              value={searchProfessor}
              onChangeText={(text) => setSearchProfessor(text)}
              style={{ height: 55, marginLeft: 5 }}
              placeholder="Professor"
            />
          </View>

          <TouchableOpacity style={styles.turmaBtnSearch} onPress={pesquisar}>
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditarTurmas", { turma: item })
              }
            >
              <View style={styles.turmaListItem}>
                <Text style={styles.turmaItemTextNome}>{item.name}</Text>
                <Text style={styles.turmaItemTextProf}>
                  {item.instructor_name}
                </Text>
                <View style={styles.turmaItemAcaoContainer}>
                  <MaterialIcons name="more-vert" size={20} color="#555" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        
        <CriarTurmaModal 
          visible={modalVisivel} 
          onClose={() => setModalVisivel(false)} 
          onCreate={handleCriarTurma}
          professores={professores}
        />
        
      </View>
    </View>
  );
}