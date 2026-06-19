import { StatusBar } from "expo-status-bar";
import {View, Image, Text, Pressable, useWindowDimensions, Animated,} from "react-native";
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
        <View style={styles.viewFlex}>
        <Pressable onPress={() => navigation.navigate("Perfil")}>
          {fotoUsuario ? (
            <Image source={{ uri: fotoUsuario }} style={styles.iconiUsario} />
          ) : (
            <Image
              source={require("../../../assets/img/icon2.png")}
              style={styles.iconiUsario}
            />
          )}
        </Pressable>
        <Text style={styles.ola}>Olá, {nomeUsuario}</Text>

        <Pressable onPress={() => navigation.navigate("Notificacoes")}>
          <Image
            source={require("../../../assets/img/Home/i (2).jpeg")}
            style={styles.notificacao}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
      <Text style={styles.textoAjuda}>Precisando de ajuda? Use o SOS</Text>

      <Pressable
        style={[
          styles.sos,
          holding && { opacity: 0.6, transform: [{ scale: 0.95 }] }
        ]}
        onPressIn={iniciarHold}
        onPressOut={cancelarHold}
      >
        <Image
          source={require("../../../assets/img/Home/sos.jpeg")}
          style={styles.imagemSos}
        />
      </Pressable>

      <Text style={styles.textoEmergencia}>EMERGÊNCIA</Text>

      <Text style={styles.textoSosPequeno}>
        Pressione o botão por 3 seconds para{" "}
      </Text>
      <Text style={styles.textoSosPequeno2}>
        mandar sua geolocalização ao seu guardião
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => navigation.navigate("MeusEnderecos")}
      >
        <Image
          source={require("../../../assets/img/Home/iconeBotao(1).jpeg")}
          style={styles.imagem}
        />
        <Text style={styles.texto}>Meus endereços</Text>
      </Pressable>
      <Pressable
        style={styles.botao}
        onPress={() => navigation.navigate("Telefones")}
      >
        <Image
          source={require("../../../assets/img/Home/iconeBotao(2).jpeg")}
          style={styles.imagem}
        />
        <Text style={styles.texto}>Telefones públicos</Text>
      </Pressable>
      </View>
      {/* Navegação */}
      <BottomNav abaAtivaInicial={0} />
      {/* --------- */}
      <StatusBar style="auto" />
    </View>
  );
}