import React, { useRef, useState } from "react";
import { Pressable, Image, Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import api from "../../services/api";
import styles from "./styles";

export default function SOSButton({ style }) {
  const [holding, setHolding] = useState(false);
  const holdTimeout = useRef(null);

  const enviarSOS = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) return;
      const usuario = JSON.parse(user);

      const permissao = await Location.requestForegroundPermissionsAsync();
      if (permissao.status !== "granted") {
        Alert.alert("Permissão negada");
        return;
      }
      const local = await Location.getCurrentPositionAsync({});
      const idUsuario = usuario.id_usuaria || usuario.id;

      await api.post("/botao-panico", {
        id_usuaria: idUsuario,
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      });
      Alert.alert("🚨 SOS enviado!");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao enviar SOS");
    }
  };

  const iniciarHold = () => {
    setHolding(true);
    holdTimeout.current = setTimeout(() => {
      enviarSOS();
      setHolding(false);
    }, 2500);
  };

  const cancelarHold = () => {
    setHolding(false);
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
  };

  return (
    <Pressable
      style={[styles.buttonSos, style,
        holding && {
          opacity: 0.6,
          transform: [{ scale: 0.95 }],
        },]}
      onPressIn={iniciarHold}
      onPressOut={cancelarHold}
    >
      <View style={styles.circle}>
        <Image
          source={require("../../../assets/img/sos.png")}
          style={{ width: '80%', height: '80%' }}
        />
      </View>
    </Pressable>
  );
}