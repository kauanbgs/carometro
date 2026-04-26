import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./Styles";

export default function ConfirmDeleteModal({ visible, onClose, onConfirm }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalOverlayClick} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Deseja Realmente excluir?</Text>

          <TouchableOpacity style={styles.modalBtnExcluir} onPress={onConfirm}>
            <Text style={styles.modalBtnText}>Sim, desejo excluir.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}