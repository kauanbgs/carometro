import styles from "../components/Styles";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";

export default function EditarTurmas({ navigation }) {
  // Estados separados para não duplicar o que é digitado
  const [nomeBusca, setNomeBusca] = useState("");
  const [numeroBusca, setNumeroBusca] = useState("");
  
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentsByClass();
  }, []);

  const getStudentsByClass = async () => {
    setLoading(true);
    try {
      const response = await api.getStudentsByClass();
      // Garante que estamos pegando a lista correta, independente da estrutura
      const data = response.data.student || response.data;
      setStudent(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Erro na requisição", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column", // Corrigido de 'direction' para 'flexDirection'
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.titulo}>Editar Turma</Text>
            
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                height: 50,
              }}
            >
              <TextInput
                value={nomeBusca}
                onChangeText={setNomeBusca}
                placeholder="Nome do Aluno"
                placeholderTextColor={"#bababa"}
                style={{
                  fontWeight: "500",
                  width: "49%",
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              />
              <TextInput
                value={numeroBusca}
                onChangeText={setNumeroBusca}
                placeholder="Numero do Estudante"
                placeholderTextColor={"#bababa"}
                keyboardType="numeric"
                style={{
                  fontWeight: "500",
                  width: "49%",
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                height: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: "49%",
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <MaterialIcons
                  name="add-circle-outline"
                  size={24}
                  color="black"
                />
                <Text
                  style={{ color: "black", fontSize: 15, fontWeight: "500" }}
                >
                  Adicionar Estudante
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={getStudentsByClass}
                style={{
                  borderWidth: 0.5,
                  backgroundColor: "#434141",
                  borderRadius: 8,
                  height: 50,
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "49%",
                }}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <MaterialIcons
                    name="search"
                    size={24}
                    color="white"
                    style={{ alignSelf: "center" }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              {/* Cabeçalho */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <Text style={{ width: "40%", fontWeight: 'bold' }}>Nome do Aluno</Text>
                <Text style={{ width: "20%", fontWeight: 'bold' }}>Numero</Text>
                <Text style={{ width: "20%", fontWeight: 'bold' }}>Turma</Text>
                <Text style={{ width: "20%", fontWeight: 'bold' }}>Ação</Text>
              </View>

              <View
                style={{
                  width: "100%",
                  borderWidth: 0.5,
                  borderRadius: 8,
                  justifyContent: "center",
                  overflow: "hidden",
                  marginTop: 10,
                }}
              />

              <FlatList
                data={student}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      alignItems: "center",
                      paddingVertical: 5,
                      borderBottomWidth: 0.2,
                      borderBottomColor: '#ccc'
                    }}
                  >
                    <Text style={{ width: "40%" }}>{item.name}</Text>
                    <Text style={{ width: "20%" }}>{item.student_number}</Text>
                    <Text style={{ width: "20%" }}>{item.class_name}</Text>

                    <TouchableOpacity
                      style={{ width: "20%", alignItems: "center" }}
                    >
                      <MaterialIcons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                )}
                // Garante que a lista apareça mesmo se o conteúdo for pequeno
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}