import Login from "./src/screens/login";

// npm install @react-navigation/native @react-navigation/stack
// npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
   </NavigationContainer>
  );
}
