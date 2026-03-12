import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// IMPORTAÇÃO DE PÁGINAS
import Login from "./src/screens/LoginScreen"
import Home from "./src/screens/HomeScreen"
import Suporte from "./src/screens/SuporteScreen"


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login}/> */}
        <Stack.Screen name="Home" component={Home}/>
        {/* <Stack.Screen name="Suporte" component={Suporte}/> */}


      </Stack.Navigator>
    </NavigationContainer>

  );
}
