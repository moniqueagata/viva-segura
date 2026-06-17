import { StatusBar } from "expo-status-bar";
import { View, Image, Text, Pressable, useWindowDimensions, Animated, } from "react-native";
import styles from "./styles";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../../components/BottomNav";

import * as Location from "expo-location";
import api from "../../services/api";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const navigation = useNavigation();

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState(null);

  const [holding, setHolding] = useState(false);
  const holdTimeout = useRef(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        const usuarioConvertido = JSON.parse(user);
        setNomeUsuario(usuarioConvertido.nome);
        setFotoUsuario(usuarioConvertido.foto);

        const idUsuario = usuarioConvertido.id_usuaria || usuarioConvertido.id;

        // Salva o push token no banco
        try {
          const { status: statusExistente } = await Notifications.getPermissionsAsync();
          let statusFinal = statusExistente;

          if (statusExistente !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            statusFinal = status;
          }

          if (statusFinal === "granted") {
            const tokenData = await Notifications.getExpoPushTokenAsync({
  projectId: 'f8650a80-bd8b-4ac4-a922-6f6fc64eee67',
});
            const tokenObtido = tokenData.data;

            console.log("TOKEN OBTIDO:", tokenObtido);
            console.log("ID USUARIO:", idUsuario);

            const resposta = await api.post(`/usuaria/${idUsuario}/salvar-token`, {
              push_token: tokenObtido,
            });

            console.log("RESPOSTA DO BACKEND:", resposta.data);
            console.log("Push Token salvo:", tokenObtido);
          }

        } catch (error) {
          console.log("Erro ao salvar token:", error);
        }

        // Verifica guardiões pendentes
     try {
  const pendentes = await api.get(`/guardioes-pendentes/${idUsuario}`);
  const vinculo = await api.get(`/guardioes/${idUsuario}`);

  if (pendentes.data.length > 0) {
    Alert.alert(
      "⏳ Guardiões Pendentes",
      "Você possui convites aguardando aceite."
    );
  } else if (vinculo.data.length > 0) {
    Alert.alert(
      "🛡️ Guardião Ativo!",
      "Seu convite foi aceito e seu guardião está ativo."
    );
  }
} catch (error) {
  console.log("Erro ao verificar pendentes:", error);
}

        
      }
    };

    carregarUsuario();
  }, []);


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
    <View style={styles.container}>
      <View style={styles.viewFlex}>
        <Pressable onPress={() => navigation.navigate("Perfil")}>
          {fotoUsuario ? (
            <Image source={{ uri: fotoUsuario }} style={styles.iconiUsario} />
          ) : (
            <Image
              source={require("../../../assets/img/Home/iconi.jpeg")}
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

        <Pressable style={styles.botao}
          onPress={() => navigation.navigate("AdicionarPontoSeguro")}
        >
          <Image
            source={require("../../../assets/img/Home/iconeBotao(3).jpeg")}
            style={styles.imagem}
          />
          <Text style={styles.texto}>Pontos Seguros</Text>
        </Pressable>

      </View>
      <BottomNav abaAtivaInicial={0} />

      <StatusBar style="auto" />
    </View>
  );
}