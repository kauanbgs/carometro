import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ScrollView,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [novoAluno, setNovoAluno] = useState({
    name: "",
    email: "",
    phone: "",
    student_number: "",
    fk_id_class: turma?.id_class || null,
    status: 1
  });

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

  const createStudent = async () => {
    try {
      await api.createStudent({
        ...novoAluno,
        student_number: Number(novoAluno.student_number),
      });
      Alert.alert("Sucesso", "Aluno criado com sucesso!");
      setModalVisible(false);
      setNovoAluno({
        name: "",
        email: "",
        phone: "",
        student_number: "",
        fk_id_class: turma?.id_class || null,
        status: 1
      });
      getStudentsByClass();
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.error || "Erro ao criar aluno");
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
            onPress={() => setModalVisible(true)}
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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "white", borderRadius: 16, padding: 24, width: "90%", maxHeight: "80%" }}>

            <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
              Criando Aluno
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>

              <Text style={{ color: "#888", marginBottom: 4 }}>Nome do aluno</Text>
              <TextInput
                value={novoAluno.name}
                onChangeText={(v) => setNovoAluno({ ...novoAluno, name: v })}
                style={{ borderWidth: 0.5, borderRadius: 8, borderColor: "#ccc", paddingHorizontal: 12, height: 48, marginBottom: 12 }}
              />

              <Text style={{ color: "#888", marginBottom: 4 }}>Numero</Text>
              <TextInput
                value={novoAluno.student_number}
                onChangeText={(v) => setNovoAluno({ ...novoAluno, student_number: v })}
                keyboardType="numeric"
                style={{ borderWidth: 0.5, borderRadius: 8, borderColor: "#ccc", paddingHorizontal: 12, height: 48, marginBottom: 12 }}
              />

              <Text style={{ color: "#888", marginBottom: 4 }}>Email</Text>
              <TextInput
                value={novoAluno.email}
                onChangeText={(v) => setNovoAluno({ ...novoAluno, email: v })}
                keyboardType="email-address"
                style={{ borderWidth: 0.5, borderRadius: 8, borderColor: "#ccc", paddingHorizontal: 12, height: 48, marginBottom: 12 }}
              />

              <Text style={{ color: "#888", marginBottom: 4 }}>Telefone</Text>
              <TextInput
                value={novoAluno.phone}
                onChangeText={(v) => setNovoAluno({ ...novoAluno, phone: v })}
                keyboardType="phone-pad"
                style={{ borderWidth: 0.5, borderRadius: 8, borderColor: "#ccc", paddingHorizontal: 12, height: 48, marginBottom: 20 }}
              />

              <TouchableOpacity
                onPress={createStudent}
                style={{ backgroundColor: "#2957a4", borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginBottom: 10 }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Criar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ height: 44, justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{ color: "#888", fontSize: 15 }}>Cancelar</Text>
              </TouchableOpacity>

            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
}