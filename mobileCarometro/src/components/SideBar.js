import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

// Agora a Sidebar recebe 'visible' e 'onClose' do Header
export default function SideBar({ visible, onClose, navigation }) {
  return (
    <Modal
      visible={visible} // Define se a Sidebar está visível ou não (True ou False)
      transparent={true} // Permite que o fundo da tela original (sua Home) continue visível por trás do Modal.
      animationType="fade" // Deixa a transição mais suave
      onRequestClose={onClose} // É uma configuração obrigatória para Android (se o usuario apertar no botao fisico de voltar) 
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          {/* Header da Sidebar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="bars" size={28} color="#333" />
            </TouchableOpacity>
            <Image
              source={require("../../image/LogoCarometro-v2.png")}
              style={styles.logo}
            />
          </View>

          {/* Itens do Menu */}
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("HomeScreen");
              }}
            >
              <MaterialIcons name="home" size={26} color="#333" />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <View style={styles.linhaFinaPreta}></View>

            <Text style={styles.sectionLabel}>ALUNOS</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Suporte");
              }}
            >
              <MaterialIcons name="groups" size={26} color="#333" />
              <Text style={styles.menuText}>Gerenciar Turmas</Text>
            </TouchableOpacity>

            <View style={styles.linhaFinaPreta}></View>

            <Text style={styles.sectionLabel}>DOCENTE</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Suporte");
              }}
            >
              <MaterialIcons name="groups" size={26} color="#333" />
              <Text style={styles.menuText}>Gerenciar Docente</Text>
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>DEV</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("GerenciarDocentes");
              }}
            >
              <MaterialIcons name="groups" size={26} color="#333" />
              <Text style={styles.menuText}>Criar ou Editar Docentes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Área fora da sidebar (clicar aqui fecha o menu) */}
        <Pressable style={styles.overlayArea} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, // Faz com que o overlay ocupe toda a tela
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)", // Fundo levemente escurecido
  },
  sidebar: {
    width: 290,
    height: "100%",
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "column",
    elevation: 10, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
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
    resizeMode: "contain", // Ajusta a imagem para caber inteira na tela
  },
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
  linhaFinaPreta: {
    height: 1,
    backgroundColor: "#00000036",
    marginVertical: 8,
  },
  overlayArea: {
    flex: 1,
  },
});