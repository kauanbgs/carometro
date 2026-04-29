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

export default function GerenciarDocentes({ navigation }) {
  const [docentes, setDocentes] = useState([]);
  const [searchNome, setSearchNome] = useState("");
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    carregarDocentes();
  }, []);

  const carregarDocentes = async () => {
    try {
      const response = await api.getInstructors();
      // ✅ backend retorna "instructors" (com s)
      setDocentes(response.data.instructors);
    } catch (error) {
      console.log("Erro ao carregar docentes", error);
    }
  };

  const pesquisar = async () => {
    try {
      if (searchNome !== "") {
        // ✅ rota correta para buscar por nome de instructor
        const response = await api.getInstructorByName(searchNome);
        setDocentes(response.data.instructor);
      } else if (searchId !== "") {
        // ✅ busca por ID
        const response = await api.getInstructorById(searchId);
        setDocentes(response.data.instructor);
      } else {
        carregarDocentes();
      }
    } catch (error) {
      Alert.alert("Aviso", "Nenhum instrutor encontrado!");
      setDocentes([]);
    }
  };

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
          <Text style={styles.turmaBtnAdicionarText}>Adicionar Docente</Text>
          <Feather name="plus-circle" size={18} color="#888" />
        </TouchableOpacity>

        <View style={styles.turmaFilterRow}>
          <TextInput
            style={styles.turmaInputNome}
            placeholder="Nome do instrutor"
            value={searchNome}
            onChangeText={setSearchNome}
          />

          <View style={{
            borderWidth: 0.3,
            borderRadius: 8,
            height: 45,
            justifyContent: "center",
            overflow: "hidden",
            width: "33%",
            marginRight: 5,
          }}>
            <TextInput
              value={searchId}
              onChangeText={(text) => setSearchId(text)}
              style={{ height: 55, marginLeft: 5 }}
              placeholder="ID"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.turmaBtnSearch} onPress={pesquisar}>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.turmaListHeader}>
          <Text style={styles.turmaListHeaderTextProf}>Nome</Text>
          <Text style={styles.turmaListHeaderTextAcao}>ID</Text>
        </View>

        <FlatList
          data={docentes}
          keyExtractor={(item) => String(item.id_instructor)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CliqueDocente", { docentes: item })}
            >
              <View style={styles.turmaListItem}>
                <Text style={{ width: "70%" }}>{item.name}</Text>
                <Text style={{ width: "15%"}}>{item.id_instructor}</Text>
                <View onPress={() => navigation.navigate("CliqueDocente")}>
                  <MaterialIcons name="menu" size={20} color="#555" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    </View>
  );
}