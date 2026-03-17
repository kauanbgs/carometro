import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
} from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

export default function SideBar({ onClose, navigation }) {

    const [sidebar, setSidebar] = useState(false);

    if (sidebar) {
        return (
            <SideBar
                onClose={() => setSidebar(false)}
                navigation={navigation}
            />
        );
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.sidebar}>

                {/*  Header  */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="bars" size={28} color="#333" />
                    </TouchableOpacity>
                    <Image
                        source={require("../../image/LogoCarometro-v2.png")}
                        style={styles.logo}
                    />
                </View>

                {/*  Itens  */}
                <View style={styles.menu}>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { navigation.navigate("HomeScreen"); onClose(); }}
                    >
                        <MaterialIcons name="home" size={26} color="#333" />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>

                    <View style={styles.linhaFinaPreta}></View>

                    <Text style={styles.sectionLabel}>ALUNOS</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { navigation.navigate("Suporte"); onClose(); }}
                    >
                        <MaterialIcons name="groups" size={26} color="#333" />
                        <Text style={styles.menuText}>Gerenciar Turmas</Text>
                    </TouchableOpacity>

                    <View style={styles.linhaFinaPreta}></View>

                    <Text style={styles.sectionLabel}>DOCENTE</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { navigation.navigate("Suporte"); onClose(); }}
                    >
                        <MaterialIcons name="groups" size={26} color="#333" />
                        <Text style={styles.menuText}>Gerenciar Docente</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionLabel}>DEV</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { navigation.navigate("Cadastro"); }}
                    >
                        <MaterialIcons name="groups" size={26} color="#333" />
                        <Text style={styles.menuText}>Criar ou Editar Docentes</Text>
                    </TouchableOpacity>

                </View>

            </View>

            {/* Área fora da sidebar fecha ao toque */}
            <Pressable style={styles.overlayArea} onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({

    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.100)",
    },

    // Painel lateral
    sidebar: {
        width: 290,
        height: "100%",
        backgroundColor: "#f5f5f5",
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: "column",
        shadowColor: "#000",
    },

    // Header
    header: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 35,
        resizeMode: "contain",
    },

    // Menu
    menu: {
        flex: 1,
        marginTop: 60,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1a73c8",
        letterSpacing: 1,
        marginTop: 8,
        marginBottom: 6,
        marginLeft: 4,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    menuText: {
        fontSize: 16,
        color: "#222",
        marginLeft: 14,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 8,
    },

    linhaFinaPreta: {
        height: 1,
        backgroundColor: "#00000036",
        marginVertical: 8,
    },

    // Área que fecha ao clicar fora
    overlayArea: {
        flex: 1,
    },
});