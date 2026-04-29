import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import styles from "../components/Styles";
import api from "../services/api";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import UpdateAluno from "../components/UpdateAlunoModal";

export default function DetalhesDoAluno({ navigation, route }) {
  const id_student = route?.params?.id_student;

  const [student, setStudent] = useState(null);
  const [occurrences, setOccurrences] = useState([]);
  const [fkIdClass, setFkIdClass] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    if (id_student) {
      carregarDadosDaAPI();
    } else {
      Alert.alert("Erro", "ID do aluno não foi encontrado.");
      navigation.navigate("EditarTurmas");
    }
  }, [id_student]);

  const carregarDadosDaAPI = async () => {
    try {
      const respostaAluno = await api.getStudentByID(id_student);

      if (respostaAluno.data?.students?.length > 0) {
        const alunoCarregado = respostaAluno.data.students[0];
        setStudent(alunoCarregado);
        if (alunoCarregado.fk_id_class) {
          setFkIdClass(alunoCarregado.fk_id_class);
        }
      } else {
        Alert.alert("Aviso", "Aluno não encontrado.");
        navigation.goBack();
      }

      try {
        const respostaOcorrencias = await api.getOccurrencesByStudent(id_student);
        const lista =
          respostaOcorrencias.data.occurrences ||
          (Array.isArray(respostaOcorrencias.data) ? respostaOcorrencias.data : []);
        setOccurrences(lista);
      } catch {
        setOccurrences([]);
      }

    } catch (error) {
      console.log("Erro ao buscar aluno:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do aluno.");
      navigation.goBack();
    }
  };

  const handleUpdateStudent = async (dadosEdicao) => {
    try {
      const dadosCompletos = {
        name: dadosEdicao.name,
        email: dadosEdicao.email,
        phone: dadosEdicao.phone,
        student_number: Number(dadosEdicao.student_number ?? student.student_number),
        fk_id_class: fkIdClass,
        status: dadosEdicao.status ?? student.status,
      };

      await api.updateStudent(id_student, dadosCompletos);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setEditModalVisible(false);
      carregarDadosDaAPI();
    } catch (error) {
      console.log("Erro ao atualizar:", error?.response?.data || error);
      Alert.alert("Erro", "Falha ao atualizar o aluno.");
    }
  };

  const confirmDelete = async () => {
    try {
      setModalVisivel(false);
      await api.deleteStudent(id_student);
      Alert.alert("Sucesso", "Aluno removido do sistema.");
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao excluir:", error?.response?.data || error);
      Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  const handleCreateOccurrence = async () => {
    if (!motivo) return Alert.alert("Erro", "Digite o motivo da ocorrência.");

    try {
      const idRaw = await AsyncStorage.getItem("id_instructor");
      const fk_id_instructor = idRaw ? parseInt(idRaw, 10) : 1;

      await api.createOccurrence({
        type: motivo,
        description: detalhes,
        fk_id_student: id_student,
        fk_id_instructor,
      });

      Alert.alert("Sucesso", "Ocorrência registrada!");
      setMotivo("");
      setDetalhes("");
      carregarDadosDaAPI();
    } catch (error) {
      console.log("Erro ao criar ocorrência:", error?.response?.data || error);
      Alert.alert("Erro", "Não foi possível registrar a ocorrência.");
    }
  };

  if (!student) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 15, fontSize: 16 }}>Buscando dados no banco...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pageContainer, { flex: 1 }]}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingTop: 20,
          paddingBottom: 100
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <FontAwesome name="user" size={40} color="#fff" />
          </View>
        </View>

        <Text style={styles.studentNameTitle}>{student.name}</Text>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.sectionTitle}>Dados do aluno</Text>
            <Text style={styles.infoText}>Turma</Text>
            <Text style={styles.infoValue}>{student.class_name}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>Status</Text>
            <Text style={[
              styles.infoValue,
              { color: student.status === 1 ? "#2e7d32" : "#c62828", fontWeight: "bold" }
            ]}>
              {student.status === 1 ? "Ativo" : "Inativo"}
            </Text>
          </View>
        </View>

        <Text style={styles.infoText}>Email</Text>
        <Text style={styles.infoValue}>{student.email}</Text>
        <Text style={styles.infoText}>Telefone</Text>
        <Text style={styles.infoValue}>{student.phone}</Text>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.btnExcluirPerfil} onPress={() => setModalVisivel(true)}>
            <Text style={styles.btnExcluirText}>Excluir perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEditarPerfil} onPress={() => setEditModalVisible(true)}>
            <MaterialIcons name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Nova Ocorrência</Text>
        <Text style={styles.infoText}>Motivo</Text>
        <TextInput
          style={styles.occurrenceInput}
          placeholder="Ex: Má Conduta"
          value={motivo}
          onChangeText={setMotivo}
        />
        <Text style={styles.infoText}>Detalhes</Text>
        <TextInput
          style={styles.occurrenceInput}
          placeholder="Opcional"
          value={detalhes}
          onChangeText={setDetalhes}
        />

        <TouchableOpacity style={styles.btnEnviarOcorrencia} onPress={handleCreateOccurrence}>
          <Text style={{ color: "white" }}>Registrar</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 30, borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 5 }]}>
          Últimas Ocorrências
        </Text>

        {occurrences && occurrences.length > 0 ? (
          occurrences.map((item, index) => (
            <View key={index} style={{ paddingVertical: 15, borderBottomWidth: 1, borderColor: "#eee" }}>
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>
                Motivo: {item.type}
              </Text>
              <Text style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
                Detalhes: {item.description}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#999", marginTop: 20, fontStyle: "italic" }}>
            Este aluno não possui nenhuma ocorrência registrada.
          </Text>
        )}

        <UpdateAluno
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          studentData={{ ...student, fk_id_class: fkIdClass }}
          onSave={handleUpdateStudent}
        />
        <ConfirmDeleteModal
          visible={modalVisivel}
          onClose={() => setModalVisivel(false)}
          onConfirm={confirmDelete}
        />
      </ScrollView>
    </View>
  );
}