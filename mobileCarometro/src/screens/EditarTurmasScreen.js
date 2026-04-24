import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import styles from "../components/Styles";
import api from "../services/api";

export default function EditarTurmas({ navigation, route }) {

  const turma = route?.params?.turma || null;

  const [students, setStudents] = useState([]);
  const [nomeBusca, setNomeBusca] = useState("");
  const [numeroBusca, setNumeroBusca] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroNumero, setFiltroNumero] = useState("");

  useEffect(() => {
    if (turma) {
      getStudentsByClass();
    }
  }, []);

  const getStudentsByClass = async () => {
    try {
      const response = await api.getStudentsByClass(turma.id_class);
      setStudents(response.data.students);
    } catch (error) {
      console.log("Erro na requisição", error);
      setStudents([]);
    }
  };

  const studentsFiltrados = students.filter((item) => {
    const nomeOk = filtroNome === "" || item.name.toLowerCase().includes(filtroNome.toLowerCase());
    const numeroOk = filtroNumero === "" || String(item.student_number).includes(filtroNumero);
    return nomeOk && numeroOk;
  });

  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>

        <Text style={styles.titulo}>
          {turma ? `Editar Turma: ${turma.name}` : "Adicionar Turma"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50 }}>
          <TextInput
            value={nomeBusca}
            onChangeText={setNomeBusca}
            placeholder="Nome do Aluno"
            placeholderTextColor="#bababa"
            style={{ fontWeight: "500", width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 10 }}
          />
          <TextInput
            value={numeroBusca}
            onChangeText={setNumeroBusca}
            placeholder="Numero do Estudante"
            placeholderTextColor="#bababa"
            keyboardType="numeric"
            style={{ fontWeight: "500", width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 10 }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, height: 50 }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{ width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
            <Text style={{ color: "black", fontSize: 15, fontWeight: "500" }}>Adicionar Estudante</Text>
          </TouchableOpacity>

          
            <TouchableOpacity
              onPress={() => {
                setFiltroNome(nomeBusca);
                setFiltroNumero(numeroBusca);
                getStudentsByClass();
              }}
              style={{ borderWidth: 0.5, backgroundColor: "#434141", borderRadius: 8, height: 50, justifyContent: "center", alignItems: "center", width: "49%" }}
            >
              <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
          <Text style={{ width: "40%", fontWeight: "bold" }}>Nome do Aluno</Text>
          <Text style={{ width: "20%", fontWeight: "bold" }}>Numero</Text>
          <Text style={{ width: "20%", fontWeight: "bold" }}>Turma</Text>
          <Text style={{ width: "20%", fontWeight: "bold" }}>Ação</Text>
        </View>

        <View style={{ width: "100%", borderWidth: 0.5, borderRadius: 8, marginTop: 10 }} />

        <FlatList
          data={studentsFiltrados}
          keyExtractor={(item, index) => item.id_student?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 0.2, borderBottomColor: "#ccc" }}>
              <Text style={{ width: "40%" }}>{item.name}</Text>
              <Text style={{ width: "20%" }}>{item.student_number}</Text>
              <Text style={{ width: "20%" }}>{item.class_name}</Text>
              <TouchableOpacity style={{ width: "20%", alignItems: "center" }}>
                <MaterialIcons name="menu" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </View>
    </View>
  );
}