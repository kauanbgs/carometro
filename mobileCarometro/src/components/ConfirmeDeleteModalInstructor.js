import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Styles";

export default function ConfirmDeleteModalInstructor({ visible, onClose, onConfirm, isInstructor = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (isInstructor) {
      if (!email || !password) return;
      onConfirm({ email, password });
      setEmail("");
      setPassword("");
    } else {
      onConfirm();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalOverlayClick} activeOpacity={1} onPress={onClose} />

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Deseja Realmente excluir?</Text>

          {/* ✅ Campos extras só para exclusão de instructor */}
          {isInstructor && (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email do docente"
                placeholderTextColor="#bababa"
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Senha do docente"
                placeholderTextColor="#bababa"
              />
            </>
          )}

          <TouchableOpacity style={styles.modalBtnExcluir} onPress={handleConfirm}>
            <Text style={styles.modalBtnText}>Sim, desejo excluir.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={{ height: 44, justifyContent: "center", alignItems: "center", marginTop: 8 }}
          >
            <Text style={{ color: "#888" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}