import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SuporteScreen from "./src/screens/SuporteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CadastroScreen from "./src/screens/CadastroScreen";

import DeleteScreen from "./src/screens/DeleteScreen";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Delete"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Suporte" component={SuporteScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Delete" component={DeleteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
