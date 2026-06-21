import { StatusBar } from "expo-status-bar";
import { View, Image, Text, Pressable } from "react-native";
import styles from "./styles";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../../components/BottomNav";
import * as Location from "expo-location";
import api from "../../services/api";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications"; 
// Notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const navigation = useNavigation();
  const [holding, setHolding] = useState(false);
  const holdTimeout = useRef(null);

  // Buscar dados da usuária e notificações
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const usuarioConvertido = JSON.parse(user);
        setNomeUsuario(usuarioConvertido.nome);
        setFotoUsuario(usuarioConvertido.foto);
        const idUsuario = usuarioConvertido.id_usuaria || usuarioConvertido.id;

        try {
          const { status: statusExistente } = await Notifications.getPermissionsAsync();
          let statusFinal = statusExistente;
          if (statusExistente !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            statusFinal = status;
          }
          
          if (statusFinal === "granted") {
            const tokenData = await Notifications.getExpoPushTokenAsync();
            const tokenObtido = tokenData.data;
            await api.post(`/usuaria/${idUsuario}/salvar-token`, {
              push_token: tokenObtido,
            });
            console.log("Push Token salvo com sucesso:", tokenObtido);
          }
        } catch (error) {
          console.log("Erro ao gerenciar notificações:", error);
        }
      }
    };
    carregarUsuario();
  }, []);
  // ------------

  // Botão de pânico - SOS
  const enviarSOS = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) return;
      const usuario = JSON.parse(user);
      console.log("USUARIO COMPLETO:", usuario);
      const permissao = await Location.requestForegroundPermissionsAsync();

      if (permissao.status !== "granted") {
        Alert.alert("Permissão negada");
        return;
      }

      const local = await Location.getCurrentPositionAsync({});
      const idUsuario = usuario.id_usuaria || usuario.id;

      console.log({
        id_usuaria: idUsuario,
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      });

      await api.post("/botao-panico", {
        id_usuaria: idUsuario,
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      });

      Alert.alert("🚨 SOS enviado!");
    } catch (error) {
      Alert.alert("Erro ao enviar SOS");
      console.log('ERRO SOS:', error.response?.data)
      console.log('ERRO MESSAGE:', error.message);
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
  // ------------

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={() => navigation.navigate("Perfil")}>
              <View style={styles.upload}>
                {fotoUsuario ? (
                  <Image
                    source={{ uri: fotoUsuario }}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/img/icon2.png")}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </View>
            </Pressable>
            <Text style={styles.textHeader}>Olá, {nomeUsuario}</Text>
          </View>
        <View>
          <Pressable>
            <Image
              source={require("../../../assets/img/sino_1.png")}
              style={{ width: 22, height: 22, tintColor: "#550fa4" }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>🚨 Precisando de ajuda? Use o SOS</Text>
        <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
          <Pressable
            style={[styles.buttonSos, holding && { opacity: 0.6, transform: [{ scale: 0.95 }] }]}
            onPressIn={iniciarHold}
            onPressOut={cancelarHold}
          >
            <View style={styles.circle}>
              <Image
                source={require("../../../assets/img/sos.png")}
                style={{ width: 120, height: 120 }}
              />
            </View>
          </Pressable>
          <Text style={{ fontSize: 18, color: "#F66E91", fontWeight:700, textAlign:'center' }}>EMERGÊNCIA</Text>
          <Text style={styles.desc}>{`Pressione o botão por 3 segundos e\nserá enviado um alerta ao seu guardião`}</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginVertical: 25 }}>
          <Pressable style={styles.button} onPress={() => navigation.navigate("MeusEnderecos")}>
            <Image
              source={require("../../../assets/img/endereco.png")}
              style={{ width: 33, height: 33, tintColor: "#844ec2" }}
            />
            <Text style={{ fontSize: 18, fontWeight: '500', color: "#844ec2", }}>Meus endereços</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Telefones")}>
            <Image
              source={require("../../../assets/img/tel.png")}
              style={{ width: 33, height: 33, tintColor: "#844ec2" }}
            />
            <Text style={{ fontSize: 18, fontWeight: '500', color: "#844ec2", }}>Telefones públicos</Text>
          </Pressable>
        </View>
      </View>
      <BottomNav abaAtivaInicial={0} />
      {/* --------- */}
      <StatusBar style="auto" />
    </View>
  );
}