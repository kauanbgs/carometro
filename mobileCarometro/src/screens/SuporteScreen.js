import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Login from "./LoginScreen";

export default function Suporte({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        // source={require("../../image/SenaiLogo.png")}
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Como podemos{"\n"}ajudar?</Text>
      
      <Text style={styles.subtitle}>
        Nosso suporte está disponivel 24h {"\n"} para registro e edição de contas
      </Text>

      <View style={styles.contactRow}> 
        <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={20} color="white" />
        </View>
        <Text style={styles.contactText}>meuemailadm@gmail.com</Text>
      </View>

      <View style={styles.contactRow}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="phone" size={20} color="white" />
        </View>
        <Text style={styles.contactText}>+99 (99)99999-9999</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 60,
    alignSelf: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    color: "#2A5699",
    fontWeight: "400",
    marginBottom: 20,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 40,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5C81BC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactText: {
    fontSize: 14,
    color: "#555555",
  },
});