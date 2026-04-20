import { StyleSheet, Platform } from "react-native";

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

  // ─── Estilos Globais Padronizados ──────────────────────────
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  pageContentCenter: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleLarge: {
    fontSize: 40,
    fontWeight: "100",
    color: "#2957a4",
    marginBottom: 20,
    lineHeight: 44,
  },
  titleMedium: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  textNormal: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#555",
    marginBottom: 20,
  },
  textHighlight: {
    color: "orange",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  divider: {
    width: "80%",
    height: 1.6,
    backgroundColor: "gray",
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
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
  // (Usa pageContainer, pageContent, titleLarge, primaryButton)
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

  // ─── LoginScreen ──────────────────────────────────────────
  loginHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    marginBottom: -50,
  },
  loginLogo: {
    width: 250,
    height: 150,
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
  // (Containeres padronizados sendo utilizados)
  cadastroButtonCriar: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 15,
    borderRadius: 8,
    marginTop: 20
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

  // ─── DeleteScreen ─────────────────────────────────────────
     title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
 input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  
    buttonDelete: {
    alignItems: "center",
    color:"#fff",
    width: "100%",
    backgroundColor: "#2957a4",
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText:{
    color:"#fff"
  },

  // ─── SuporteScreen 
  // Usa pageContainer, pageContent, titleLarge
  suporteLogo: {
    width: 250,
    height: 270,
    alignSelf: "center",
    marginBottom: 0,
    resizeMode: "contain",
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
  // ESTILIZAÇÃO GerenciarDocentesScreen 
  // Usa primaryButton, titleMedium, textNormal
  titulo: {
    fontSize: 30,
    fontWeight: "400",
    color: "#333"
  },
  texto: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#333"
  },
});