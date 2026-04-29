import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../components/Header";
import styles from "../components/Styles";
import api from "../services/api";
import UpdateInstructor from "../components/UpdateInstructorModal";
import ConfirmDeleteModalInstructor from "../components/ConfirmeDeleteModalInstructor"

export default function CliqueDocente({ navigation, route }) {
    const docente = route?.params?.docentes;

    const [instructor, setInstructor] = useState(docente);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const handleUpdateInstructor = async (dadosEdicao) => {
        try {
            await api.updateInstructor(instructor.id_instructor, dadosEdicao);
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
            setInstructor({ ...instructor, name: dadosEdicao.name, role: dadosEdicao.role });
            setEditModalVisible(false);
        } catch (error) {
            console.log("Erro ao atualizar:", error?.response?.data || error);
            Alert.alert("Erro", "Falha ao atualizar o docente.");
        }
    };

    const confirmDelete = async ({ email, password }) => {
        try {
            await api.DeleteDocente({ email, password });
            setModalVisivel(false);
            Alert.alert("Sucesso", "Docente removido do sistema.");
            navigation.goBack();
        } catch (error) {
            console.log("Erro ao excluir:", error?.response?.data || error);
            Alert.alert("Erro", error?.response?.data?.error || "Falha ao excluir.");
        }
    };

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

                <Text style={styles.studentNameTitle}>{instructor.name}</Text>
                <Text style={[styles.sectionTitle, { textAlign: "center", marginTop: 0 }]}>
                    Dados do docente
                </Text>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <Text style={[styles.infoText, { width: 90 }]}>Nome</Text>
                        <Text style={styles.infoValue}>{instructor.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <Text style={[styles.infoText, { width: 90 }]}>Email</Text>
                        <Text style={styles.infoValue}>{instructor.email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <Text style={[styles.infoText, { width: 90 }]}>Tipo</Text>
                        <Text style={styles.infoValue}>{instructor.role === "adm" ? "Administrador" : "Instrutor"}</Text>
                    </View>
                </View>

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
                        <MaterialIcons name="drive-file-rename-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <UpdateInstructor
                    visible={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    instructorData={instructor}
                    onSave={handleUpdateInstructor}
                />

                <ConfirmDeleteModalInstructor
                    visible={modalVisivel}
                    onClose={() => setModalVisivel(false)}
                    onConfirm={confirmDelete}
                    isInstructor={true} 
                />
            </ScrollView>
        </View>
    );
}