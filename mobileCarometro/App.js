import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SuporteScreen from "./src/screens/SuporteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import EditarTurmas from "./src/screens/EditarTurmasScreen";
import DeleteScreen from "./src/screens/DeleteScreen";
import GerenciarTurma from "./src/screens/GerenciarTurma";
import DetalhesDoAluno from "./src/screens/CliqueAlunoScreen";
import GerenciarDocentes from "./src/screens/ListarDocentes";
import GerenciarDocentesScreen from "./src/screens/GerenciarDocentesScreen";
import CliqueDocente from "./src/screens/CliqueDocenteScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Suporte" component={SuporteScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Delete" component={DeleteScreen} />
        <Stack.Screen name="GerenciarDocentes" component={GerenciarDocentes} />
        <Stack.Screen name="EditarTurmas" component={EditarTurmas} />
        <Stack.Screen name="GerenciarTurma" component={GerenciarTurma} />
        <Stack.Screen name="DetalhesDoAluno" component={DetalhesDoAluno} />
        <Stack.Screen name="GerenciarDocentesScreen" component={GerenciarDocentesScreen} />
        <Stack.Screen name="CliqueDocente" component={CliqueDocente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}