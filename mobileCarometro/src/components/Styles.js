import { StyleSheet, Platform } from "react-native";
import GerenciarDocentes from "../screens/GerenciarDocentesScreen";

export default StyleSheet.create({

  // ─── Compartilhados ───────────────────────────────────────
  // Estilos usados em mais de uma tela
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  formInput: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonWhiteText: {
    color: "white",
    fontWeight: "bold",
  },

  // ─── Header (componente Header.js) ────────────────────────
  header: {
    paddingTop: 20,
    height: 150,
    flexDirection: "row",
    marginTop: 30,
  },
  botaosidebar: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 30,
  },
  headerLogo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 15,
    marginRight: 15,
  },

  // ─── Sidebar (SideBar.js) ─────────────────────────────────
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebar: {
    width: 290,
    height: "100%",
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    }),
  },
  sidebarMenu: {
    flex: 1,
    marginTop: 60,
  },
  sidebarSectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a73c8",
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 6,
    marginLeft: 4,
  },
  sidebarMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  sidebarMenuText: {
    fontSize: 16,
    color: "#222",
    marginLeft: 14,
  },
  sidebarLinhaFina: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.21)",
    marginVertical: 8,
  },
  sidebarOverlayArea: {
    flex: 1,
  },

  // ─── HomeScreen ───────────────────────────────────────────
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeContent: {
    flex: 1,
    paddingRight: 25,
    paddingTop: 15,
  },
  homeTitulo: {
    marginTop: -20,
    fontSize: 34,
    fontWeight: "100",
    textAlign: "left",
  },
  homeEditar: {
    color: "orange",
  },
  homeTexto: {
    fontWeight: "normal",
    marginTop: 15,
    fontSize: 20,
    textAlign: "left",
  },
  homeBotoes: {
    alignSelf: "flex-start",
  },
  homeButtonText: {
    width: 250,
    height: 50,
    fontWeight: "bold",
    borderRadius: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    backgroundColor: "#f0854cff",
    color: "#000000a8",
    padding: 11,
    marginTop: 30,
    marginLeft: 20,
  },
  homeLinhaFinaPreta: {
    width: 225,
    height: 1.6,
    backgroundColor: "gray",
    marginTop: 34,
    marginBottom: 50,
    marginLeft: 33,
  },

  // ─── LoginScreen ──────────────────────────────────────────
  loginHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    marginBottom: -200,
  },
  loginLogo: {
    width: 250,
    height: 150,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  loginTitle: {
    fontSize: 40,
    fontWeight: "100",
    marginRight: 70,
    marginBottom: 30,
    color: "#2957a4",
  },
  loginButtonEntrar: {
    alignItems: "center",
    width: 320,
    backgroundColor: "#2957a4",
    padding: 7,
    borderRadius: 3,
    marginTop: 20,
  },
  loginCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  loginCheckboxLabel: {
    marginLeft: 10,
    color: "#bababa",
    fontSize: 16,
  },
  loginCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    left: -85,
  },
  loginFooterText: {
    color: "#bababa",
    fontSize: 16,
  },
  loginLinkText: {
    color: "#333",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  // ─── CadastroScreen ───────────────────────────────────────
  cadastroContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  cadastroContent: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  cadastroInput: {
    width: "100%",
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 25,
    fontSize: 16,
    color: "#333",
  },
  cadastroPickerWrapper: {
    marginBottom: 25,
  },
  cadastroPickerLabel: {
    fontSize: 14,
    color: "#bababa",
    marginBottom: 5,
  },
  cadastroPickerContainer: {
    width: "100%",
    ...Platform.select({
      ios: {
        backgroundColor: "#f2f2f7",
        borderRadius: 10,
        overflow: "hidden",
      },
      android: {
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
      },
    }),
  },
  cadastroPicker: {
    width: "100%",
    ...Platform.select({
      ios: { height: 150 },
      android: { height: 50, color: "#333" },
    }),
  },
  cadastroPickerItem: {
    fontSize: 16,
    height: 150,
  },
  cadastroButtonCriar: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },

  // ─── DeleteScreen ─────────────────────────────────────────
  deleteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  deleteButtonDelete: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },

  // ─── SuporteScreen ────────────────────────────────────────
  suporteContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 44,
    justifyContent: "flex-start",
  },
  suporteLogo: {
    width: 250,
    height: 270,
    alignSelf: "center",
    marginBottom: -20,
    resizeMode: "contain",
  },
  suporteTitle: {
    fontSize: 40,
    color: "#2A5699",
    fontWeight: "100",
    marginBottom: 20,
    lineHeight: 44,
  },
  suporteSubtitle: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 40,
    lineHeight: 20,
  },
  suporteContactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  suporteIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5C81BC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  suporteContactText: {
    fontSize: 14,
    color: "#555555",
  },
  suporteButtonVoltar: {
    marginTop: 40,
  },
  suporteButtonVoltarText: {
    width: 287,
    backgroundColor: "#2957a4",
    color: "white",
    fontSize: 13,
    padding: 7,
    textAlign: "center",
  },

  // ESTILIZAÇÃO GerenciarDocentesScreen ────────────────────────────────────────
  titulo: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333"
  },
  texto: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#333"
  }
});