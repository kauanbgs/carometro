import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SideBar from "./SideBar";
import styles from "./Styles";

export default function Header({ navigation }) {
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
          style={styles.headerLogo}
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