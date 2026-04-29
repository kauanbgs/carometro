import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Styles";

export default function UpdateAluno({ visible, onClose, onSave, studentData }) {
  const [dadosEdicao, setDadosEdicao] = useState({
    name: "",
    email: "",
    phone: "",
    student_number: "",
    status: 1,
  });

  useEffect(() => {
    if (visible && studentData) {
      setDadosEdicao({
        name: studentData.name || "",
        email: studentData.email || "",
        phone: studentData.phone || "",
        student_number: String(studentData.student_number || ""),
        status: studentData.status ?? 1,
      });
    }
  }, [visible, studentData]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

          <Text style={styles.modalTitle}>Editar Aluno</Text>

          <Text style={styles.label}>Nome do aluno</Text>
          <TextInput
            style={styles.input}
            value={dadosEdicao.name}
            onChangeText={(v) => setDadosEdicao({ ...dadosEdicao, name: v })}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={dadosEdicao.email}
            onChangeText={(v) => setDadosEdicao({ ...dadosEdicao, email: v })}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={dadosEdicao.phone}
            onChangeText={(v) => setDadosEdicao({ ...dadosEdicao, phone: v })}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Status</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => setDadosEdicao({ ...dadosEdicao, status: 1 })}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: dadosEdicao.status === 1 ? "#2e7d32" : "#ccc",
                backgroundColor: dadosEdicao.status === 1 ? "#e8f5e9" : "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: dadosEdicao.status === 1 ? "#2e7d32" : "#999", fontWeight: "600" }}>
                Ativo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDadosEdicao({ ...dadosEdicao, status: 0 })}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: dadosEdicao.status === 0 ? "#c62828" : "#ccc",
                backgroundColor: dadosEdicao.status === 0 ? "#ffebee" : "#fff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: dadosEdicao.status === 0 ? "#c62828" : "#999", fontWeight: "600" }}>
                Inativo
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => onSave(dadosEdicao)}>
            <Text style={styles.buttonWhiteText}>Salvar Alterações</Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}