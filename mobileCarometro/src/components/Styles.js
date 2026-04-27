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

  // ─── GerenciarTurmasScreen ────────────────────────────────
  turmaHeaderContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  turmaTitle: {
    fontSize: 28,
    fontWeight: "400",
    color: "#000",
  },
  turmaBtnAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  turmaBtnAdicionarText: {
    fontSize: 16,
    color: "#888",
    marginRight: 10,
  },
  turmaFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  turmaInputNome: {
    flex: 1.3,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 5,
    width: "33%",
    marginRight: 5,
  },
  turmaPickerContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    marginRight: 10,
  },
  turmaBtnSearch: {
    width: 45,
    height: 45,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  turmaListHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    paddingBottom: 10,
    marginBottom: 10,
  },
  turmaListHeaderTextNome: {
    flex: 2,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  turmaListHeaderTextProf: {
    flex: 1.5,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  turmaListHeaderTextAcao: {
    flex: 0.5,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  turmaListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  turmaItemTextNome: {
    flex: 2,
    fontSize: 14,
    color: "#555",
  },
  turmaItemTextProf: {
    flex: 1.5,
    fontSize: 14,
    color: "#555",
  },
  turmaItemAcaoContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  // ─── Modals ───────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlayClick: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 25,
    borderRadius: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalLabel: {
    color: "#666",
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalPickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  modalBtnCriar: {
    backgroundColor: "#4A89DF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  modalBtnExcluir: {
    backgroundColor: "#D33F3F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  // --- ESTILOS DA TELA DE DETALHES DO ALUNO ---
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentNameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: 120,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  btnExcluirPerfil: {
    borderWidth: 1,
    borderColor: '#ff4d4d',
    borderRadius: 8,
    width: '48%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnExcluirText: {
    color: '#ff4d4d',
    fontWeight: '500',
  },
  btnEditarPerfil: {
    backgroundColor: '#434141',
    borderRadius: 8,
    width: '48%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  occurrenceInput: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15,
  },
  btnEnviarOcorrencia: {
    backgroundColor: '#4a8add',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  occurrenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  occurrenceText: {
    fontSize: 12,
    color: '#666',
    width: '90%',
  },
  
});