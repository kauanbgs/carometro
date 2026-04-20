import styles from "../components/Styles";
import Header from "../components/Header";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function EditarTurmas({ navigation }) {
  const [selectedProfessor, setSelectedProfessor] = React.useState("");
  const [selectedAluno, setSelectedAluno] = React.useState("");

  return (

    <View style={styles.pageContainer}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <Text style={styles.titulo}>Editar Turmas</Text>

        {/* VIEW PARA AGRUPAR OS INPUTS */}
        <View style={{ flexDirection: "column", justifyContent: "space-between", marginTop: 10 }}>
          <View>{/* EDITAR TURMA */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50, }}>
              <TextInput placeholder="Nome da turma" placeholderTextColor={"#bababa"} style={{ fontWeight: "500", width: "80%", height: 50, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 10, }} />
              <TouchableOpacity style={{ width: "18%", height: 50, backgroundColor: "#434141", borderRadius: 8, justifyContent: "center", alignItems: "center", }}>
                <MaterialIcons name="open-in-new" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 7, height: 50, marginBottom: 50 }}>
              <View style={{ borderWidth: 0.5, borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <Picker
                  selectedValue={selectedProfessor}
                  onValueChange={(itemValue) => setSelectedProfessor(itemValue)}
                  style={{ color: "#000", width: "100%" }}
                  mode="dropdown"
                >
                  <Picker.Item label="Professor" value="" />
                  <Picker.Item label="João" value="joao" />
                  <Picker.Item label="Maria" value="maria" />
                </Picker>
              </View>

              <TouchableOpacity style={{ borderWidth: 0.5, borderColor: "red", borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <Text style={{ color: "black", fontSize: 18, fontWeight: "300", textAlign: "center" }}>Excluir Turma</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ direction: "row", justifyContent: "space-between", marginTop: 10, }}>{/* ADICIONAR TURMA */}
            <Text style={styles.titulo}>Ver Turmas</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50, }}>
              <TextInput placeholder="Nome do aluno" placeholderTextColor={"#bababa"} style={{ fontWeight: "500", width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 10, }} />
              <View style={{ borderWidth: 0.5, borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <Picker
                  selectedValue={selectedAluno}
                  onValueChange={(itemValue) => setSelectedAluno(itemValue)}
                  style={{ color: "#000", width: "100%" }}
                  mode="dropdown"
                >
                  <Picker.Item label="Aluno" value="" />
                  <Picker.Item label="João" value="joao" />
                  <Picker.Item label="Maria" value="maria" />
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50, }}>

              <TouchableOpacity style={{ width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
                <MaterialIcons name="add-circle-outline" size={24} color="black" />
                <Text style={{ color: "black", fontSize: 15, fontWeight: "500"}}>Adicionar Turma</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ borderWidth: 0.5, backgroundColor: "#434141", borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <MaterialIcons name="search" size={24} color="black" style={{ alignSelf: "center", color: "white" }} />
              </TouchableOpacity>

            </View>

          </View>




        </View>
      </View>
    </View>
  );
}