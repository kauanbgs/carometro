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
import { Picker } from "@react-native-picker/picker";
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

  // FIX BUG 1: guardar fk_id_class separado, pois o objeto student
  // retornado pela API tem class_name mas não fk_id_class.
  // Esse valor é necessário para o updateStudent (campo obrigatório no backend).
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

      if (
        respostaAluno.data &&
        respostaAluno.data.students &&
        respostaAluno.data.students.length > 0
      ) {
        const alunoCarregado = respostaAluno.data.students[0];
        setStudent(alunoCarregado);

        // FIX BUG 1: salvar fk_id_class se vier na resposta.
        // Se o backend retornar fk_id_class junto com class_name, perfeito.
        // Se não retornar, você precisa adicionar fk_id_class na query do
        // getStudentByID no backend (SELECT student.fk_id_class, ...).
        if (alunoCarregado.fk_id_class) {
          setFkIdClass(alunoCarregado.fk_id_class);
        }
      } else {
        Alert.alert("Aviso", "Aluno não encontrado no banco de dados.");
        navigation.goBack();
      }

      try {
        const respostaOcorrencias = await api.getOccurrencesByStudent(id_student);
        const lista =
          respostaOcorrencias.data.occurrences || respostaOcorrencias.data || [];
        setOccurrences(lista);
      } catch (occError) {
        console.log("Aluno sem ocorrências ou erro na busca de ocorrências");
        setOccurrences([]);
      }
    } catch (error) {
      console.log("Erro fatal ao buscar aluno:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do aluno.");
      navigation.goBack();
    }
  };

  const handleUpdateStudent = async (dadosEdicao) => {
    try {
      // FIX BUG 2: garantir que fk_id_class esteja presente nos dados de edição.
      // O updateStudent no backend exige fk_id_class — sem ele a validação falha.
      // O UpdateAlunoModal deve passar fk_id_class nos dadosEdicao, ou completamos aqui.
      const dadosCompletos = {
        ...dadosEdicao,
        fk_id_class: dadosEdicao.fk_id_class ?? fkIdClass,
        status: dadosEdicao.status ?? student.status,
      };

      await api.updateStudent(id_student, dadosCompletos);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setEditModalVisible(false);
      carregarDadosDaAPI();
    } catch (error) {
      console.log("Erro ao atualizar aluno:", error?.response?.data || error);
      Alert.alert("Erro", "Falha ao atualizar o aluno.");
    }
  };

  // FIX BUG 1: handleUpdateStatus agora monta o payload completo que o backend exige.
  // Antes, mandava só { ...student, status: newStatus }, mas student.fk_id_class
  // é undefined — o objeto vindo da API tem class_name, não fk_id_class.
  // Sem fk_id_class, o validateStudent rejeita a requisição com 400.
  const handleUpdateStatus = async (newStatus) => {
    if (!fkIdClass) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar a turma do aluno. Recarregue a tela."
      );
      return;
    }

    try {
      const payload = {
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: newStatus,
        student_number: student.student_number,
        fk_id_class: fkIdClass, // campo obrigatório que faltava
      };

      await api.updateStudent(id_student, payload);
      setStudent((prev) => ({ ...prev, status: newStatus }));
      Alert.alert("Sucesso", "Status alterado!");
    } catch (error) {
      console.log("Erro ao alterar status:", error?.response?.data || error);
      Alert.alert("Erro", "Falha ao alterar status.");
    }
  };

  const confirmDelete = async () => {
    try {
      setModalVisivel(false);
      await api.deleteStudent(id_student);
      Alert.alert("Sucesso", "Aluno removido do sistema.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  const handleCreateOccurrence = async () => {
    if (!motivo) return Alert.alert("Erro", "Digite o motivo da ocorrência.");

    try {
      const idRaw = await AsyncStorage.getItem("id_instructor");

      // FIX BUG 3: AsyncStorage sempre retorna string ou null.
      // parseInt(null) retorna NaN — e NaN enviado ao backend causa erro.
      // Usar o fallback 1 só se realmente não houver id salvo.
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
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 15, fontSize: 16 }}>Buscando dados no banco...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pageContainer, { flex: 1 }]}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[styles.pageContent, { paddingBottom: 50 }]}
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
            <View style={styles.pickerContainer}>
              <Picker selectedValue={student.status} onValueChange={handleUpdateStatus}>
                <Picker.Item label="Ativo" value={1} />
                <Picker.Item label="Inativo" value={0} />
              </Picker>
            </View>
          </View>
        </View>

        <Text style={styles.infoText}>Email</Text>
        <Text style={styles.infoValue}>{student.email}</Text>
        <Text style={styles.infoText}>Telefone</Text>
        <Text style={styles.infoValue}>{student.phone}</Text>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={styles.btnExcluirPerfil}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={styles.btnExcluirText}>Excluir perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnEditarPerfil}
            onPress={() => setEditModalVisible(true)}
          >
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

        <Text
          style={[
            styles.sectionTitle,
            { marginTop: 30, borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 5 },
          ]}
        >
          Últimas Ocorrências
        </Text>

        {occurrences && occurrences.length > 0 ? (
          occurrences.map((item, index) => (
            <View
              key={index}
              style={{ paddingVertical: 15, borderBottomWidth: 1, borderColor: "#eee" }}
            >
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>
                Motivo: {item.type}
              </Text>
              <Text style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
                Detalhes: {item.description}
              </Text>
            </View>
          ))
        ) : (
          <Text
            style={{ textAlign: "center", color: "#999", marginTop: 20, fontStyle: "italic" }}
          >
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