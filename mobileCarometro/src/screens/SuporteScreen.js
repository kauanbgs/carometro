import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../components/Styles";

export default function Suporte({ navigation }) {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.pageContent}>
        <Image
          source={require("../../image/LogoCarometro-v2.png")}
          style={styles.suporteLogo}
        />

        <Text style={styles.titleLarge}>Como podemos{"\n"}ajudar?</Text>

        <Text style={styles.textNormal}>
          Nosso suporte está disponivel 24h{"\n"}para registro e edição de contas
        </Text>

        <View style={styles.suporteContactRow}>
          <View style={styles.suporteIconContainer}>
            <MaterialIcons name="email" size={20} color="white" />
          </View>
          <Text style={styles.suporteContactText}>meuemailadm@gmail.com</Text>
        </View>

        <View style={styles.suporteContactRow}>
          <View style={styles.suporteIconContainer}>
            <MaterialIcons name="phone" size={20} color="white" />
          </View>
          <Text style={styles.suporteContactText}>+99 (99)99999-9999</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonWhiteText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
