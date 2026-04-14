import styles from "../components/Styles";
import Header from "../components/Header";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function EditarTurmas({ navigation }) {
  return (
    <View style={styles.pageContainer}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <Text style={styles.titulo}>Editar Turmas</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Nome da turma"
            placeholderTextColor={"#bababa"}
            style={{
              width: "70%",
              height: 40,
              borderWidth: 0.5,
              borderRadius: 8,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}/>
            <MaterialIcons name="open-in-new" size={24} color="white" style={{width: "20%", height: 40, backgroundColor: "#000000ff", borderRadius: 8, alignItems: "center", justifyContent: "center"}}/>
          
        </View>
      </View>
    </View>
  );
}