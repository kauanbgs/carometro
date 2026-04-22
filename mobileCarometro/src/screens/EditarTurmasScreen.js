import styles from "../components/Styles";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";  

export default function EditarTurmas({ navigation, route }) {

  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("turma");
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });


  useEffect(() => {
    api.getTurmas().then((response) => {
      setClasses(response.data.classes || []);
    }).catch(() => setClasses([]));
  }, []);

  useEffect(() => {
    api.getDocentes().then((response) => {
      setInstrutores(response.data.instructors);
    }).catch(() => setInstrutores([]));
  }, []);

  function buscar() {
    if (searchTerm.trim()) {
      if (searchType === "turma") {
        api.getTurmaByName(searchTerm).then((response) => {
          setClasses(response.data.classes || []);
        }).catch(() => setClasses([]));
      } else {
        api.getTurmaByInstructorName(searchTerm).then((response) => {
          setClasses(response.data.classes || []);
        }).catch(() => setClasses([]));
      }
    } else {
      api.getTurmas().then((response) => {
        setClasses(response.data.classes || []);
      }).catch(() => setClasses([]));
    }
  }


  return (

    <View style={styles.pageContainer}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>

        {/* VIEW PARA AGRUPAR OS INPUTS */}
        <View style={{ flexDirection: "column", justifyContent: "space-between", marginTop: 10 }}>
          <View style={{ direction: "row", justifyContent: "space-between", marginTop: 10, }}>{/* ADICIONAR TURMA */}
            <Text style={styles.titulo}>Ver Turmas</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50, }}>
              <TextInput 
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder={searchType === "turma" ? "Nome da Turma" : "Nome do Professor"} 
                placeholderTextColor={"#bababa"} 
                style={{ fontWeight: "500", width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, paddingHorizontal: 10, }} 
              />
              <View style={{ borderWidth: 0.5, borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <Picker
                  selectedValue={searchType}
                  onValueChange={(itemValue) => setSearchType(itemValue)}
                  style={{ color: "#000", width: "100%" }}
                  mode="dropdown"
                >
                  <Picker.Item label="Nome da Turma" value="turma" />
                  <Picker.Item label="Nome do Professor" value="professor" />
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, height: 50, }}>

              <TouchableOpacity onPress={() => { }} style={{ width: "49%", height: 50, borderWidth: 0.5, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
                <MaterialIcons name="add-circle-outline" size={24} color="black" />
                <Text style={{ color: "black", fontSize: 15, fontWeight: "500" }}>Adicionar Turma</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={buscar} style={{ borderWidth: 0.5, backgroundColor: "#434141", borderRadius: 8, height: 50, justifyContent: "center", overflow: "hidden", width: "49%" }}>
                <MaterialIcons name="search" size={24} color="black" style={{ alignSelf: "center", color: "white" }} />
              </TouchableOpacity>

            </View>

            <View>

              {/* Cabeçalho */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30, }}>
                <Text style={{ width: "50%" }}>Nome da Turma</Text>
                <Text style={{ width: "30%" }}>Professor</Text>
                <Text style={{ width: "20%" }}>Ações</Text>
              </View>

              <View style={{ width: "100%", borderWidth: 0.5, borderRadius: 8, justifyContent: "center", overflow: "hidden", marginTop: 10 }}></View>


              <FlatList
                data={classes}
                keyExtractor={(item) => item.id_class?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                    <Text style={{ width: "50%" }}>{item.name}</Text>
                    <Text style={{ width: "30%" }}>{item.instructor_name || "Sem Professor"}</Text>

                    <TouchableOpacity
                      style={{ width: "20%", alignItems: "center" }}
                      onPress={() => navigation.navigate("GerenciarTurma", { classId: item.id_class, className: item.name })}
                    >
                      <MaterialIcons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

          </View>




        </View>
      </View>


    </View>
  );
}