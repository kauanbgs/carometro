import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SideBar from "./SideBar"; // Ajuste o caminho se a Sidebar estiver em outra pasta

export default function Header({ navigation }) {
  // Estado local para controlar a Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaosidebar}
          onPress={() => setIsSidebarOpen(true)}
        >
          <AntDesign name="bars" size={40} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../image/LogoCarometro-v2.png")}
          style={styles.logo}
        />
      </View>

      <SideBar
        visible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    paddingTop: 20,
    height: 150,
    flexDirection: "row",
    marginTop: 30,
  },
  botaosidebar: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 70,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 15,
    marginRight: 15,
  },
});