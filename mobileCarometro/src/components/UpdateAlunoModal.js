import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

import styles from "./Styles";

export default function UpdateAluno({ visible, onClose, onSave, studentData }) {
 
  const [dadosEdicao, setDadosEdicao] = useState({
    name: "",
    email: "",
    phone: "",
    student_number: "",
  });

 
  useEffect(() => {
    if (visible && studentData) {
      setDadosEdicao({
        name: studentData.name || "",
        email: studentData.email || "",
        phone: studentData.phone || "",
        student_number: String(studentData.student_number || ""),
      });
    }
  }, [visible, studentData]);

 return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      > 
     
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()} 
        >
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