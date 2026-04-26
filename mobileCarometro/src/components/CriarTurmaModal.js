import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./Styles";

export default function CriarTurmaModal({
  visible,
  onClose,
  onCreate,
  professores,
}) {
  const [nomeTurma, setNomeTurma] = useState("");
  const [professorId, setProfessorId] = useState("");

  // A função e o return precisam ficar DENTRO da função principal!
  function handleCriar() {
    onCreate({ name: nomeTurma, fk_id_instructor: professorId });
    setNomeTurma("");
    setProfessorId("");
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalOverlayClick}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Criando Turma</Text>

          <Text style={styles.modalLabel}>Nome da turma</Text>
          <TextInput
            style={styles.modalInput}
            value={nomeTurma}
            onChangeText={setNomeTurma}
          />

          <Text style={styles.modalLabel}>Professor</Text>
          <View style={styles.modalPickerContainer}>
            <Picker
              selectedValue={professorId}
              onValueChange={(item) => setProfessorId(item)}
            >
              <Picker.Item label="Selecione um professor..." value="" />
              {professores &&
                professores.map((prof) => (
                  <Picker.Item
                    key={prof.id_instructor}
                    label={prof.name}
                    value={prof.id_instructor}
                  />
                ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.modalBtnCriar} onPress={handleCriar}>
            <Text style={styles.modalBtnText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
} 