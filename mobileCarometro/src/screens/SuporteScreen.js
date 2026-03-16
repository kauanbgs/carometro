import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Suporte({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../image/LogoCarometro-v2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Como podemos{"\n"}ajudar?</Text>

      <Text style={styles.subtitle}>
        Nosso suporte está disponivel 24h{"\n"}para registro e edição de
        contas
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 40 }}
      >
        <Text
          style={{
            width: 287,
            backgroundColor: "#2957a4",
            color: "white",
            fontSize: 13,
            padding: 7,
            textAlign: "center",
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 44,
    justifyContent: "flex-start",
  },
  logo: {
    width: 250,
    height: 270,
    alignSelf: "center",
    marginBottom: -20,
  },
  title: {
    fontSize: 40,
    color: "#2A5699",
    fontWeight: "100",
    marginBottom: 20,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 40,
    lineHeight: 20,
    flexDirection: "row"
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
    marginRight: 10 ,
  },
  contactText: {
    fontSize: 14,
    color: "#555555",
  },
});
