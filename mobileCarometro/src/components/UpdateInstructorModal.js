import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Styles";

export default function UpdateInstructor({ visible, onClose, onSave, instructorData }) {
  const [dadosEdicao, setDadosEdicao] = useState({
    name: "",
    password: "",
    role: "inst",
  });

  useEffect(() => {
    if (visible && instructorData) {
      setDadosEdicao({
        name: instructorData.name || "",
        password: "",
        role: instructorData.role || "inst",
      });
    }
  }, [visible, instructorData]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

          <Text style={styles.modalTitle}>Editar Docente</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={dadosEdicao.name}
            onChangeText={(v) => setDadosEdicao({ ...dadosEdicao, name: v })}
          />

          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            value={dadosEdicao.password}
            onChangeText={(v) => setDadosEdicao({ ...dadosEdicao, password: v })}
            secureTextEntry
            placeholder="Digite a nova senha"
            placeholderTextColor="#bababa"
          />

          <Text style={styles.label}>Tipo</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => setDadosEdicao({ ...dadosEdicao, role: "inst" })}
              style={{
                flex: 1, height: 44, borderRadius: 8, borderWidth: 1.5,
                borderColor: dadosEdicao.role === "inst" ? "#2957a4" : "#ccc",
                backgroundColor: dadosEdicao.role === "inst" ? "#e3eaf7" : "#fff",
                justifyContent: "center", alignItems: "center",
              }}
            >
              <Text style={{ color: dadosEdicao.role === "inst" ? "#2957a4" : "#999", fontWeight: "600" }}>
                Instrutor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDadosEdicao({ ...dadosEdicao, role: "adm" })}
              style={{
                flex: 1, height: 44, borderRadius: 8, borderWidth: 1.5,
                borderColor: dadosEdicao.role === "adm" ? "#2957a4" : "#ccc",
                backgroundColor: dadosEdicao.role === "adm" ? "#e3eaf7" : "#fff",
                justifyContent: "center", alignItems: "center",
              }}
            >
              <Text style={{ color: dadosEdicao.role === "adm" ? "#2957a4" : "#999", fontWeight: "600" }}>
                Administrador
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => onSave(dadosEdicao)}
          >
            <Text style={styles.buttonWhiteText}>Salvar Alterações</Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}