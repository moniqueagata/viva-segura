import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Alert,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import styles from "./styles/stylesGuardiao3";
import api from "../../services/api";

export default function Passo3Guardiao() {
  const navigation = useNavigation();
  const route = useRoute();
  const { nome, email, telefone, senha, codigo_convite } = route.params;
  const [modal, setModal] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [image, setImage] = useState(null);

  // Foto de perfil
  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status !== "granted" || galeria.status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir acesso à câmera e galeria."
      );
      return false;
    }
    return true;
  };

  const tirarFoto = async () => {
    const ok = await solicitarPermissoes();
    if (!ok) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
        base64: true,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        setModal(false);
      }
    } catch (error) {
      Alert.alert("Erro ao abrir câmera");
    }
  };

  const escolherDaGaleria = async () => {
    const ok = await solicitarPermissoes();
    if (!ok) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
        base64: true,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        setModal(false);
      }
    } catch (error) {
      Alert.alert("Erro ao abrir galeria");
    }
  };

  const excluirFoto = () => {
    setImage(null);
    setModal(false);
  };

  // Verificação
  const finalizarCadastro = async (fotoPerfil) => {
    try {
      const usuario = {
        nome,
        email,
        senha,
        telefone: telefone.replace(/\D/g, ""),
        codigo_convite: codigo_convite,
        foto: fotoPerfil || null,
      };
      console.log("ENVIANDO:", usuario);
      const response = await api.post("/cadastrar-guardiao", usuario);
      console.log("SUCESSO:", response.data);
      setModalSucesso(true);

    } catch (error) {
      console.log("ERRO:",error.response?.data || error.message);
      Alert.alert("Erro ao cadastrar");
    }
  };

  const irLogin = () => {
    setModalSucesso(false);
    navigation.replace("Login");
  };

  // Barra de progresso
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const [reactiveValue, setReactiveValue] = useState(-1000);
  const step = 4;
  const steps = 4;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [reactiveValue]);

  useEffect(() => {
    setReactiveValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={modal}
          dismissable
          onDismiss={() => setModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modal}>
            <Pressable style={styles.buttonModal} onPress={tirarFoto}>
              <Text style={styles.txButton}>Tirar foto da câmera</Text>
            </Pressable>

            <Pressable
              style={styles.buttonModal}
              onPress={escolherDaGaleria}
            >
              <Text style={styles.txButton}>Selecionar da galeria</Text>
            </Pressable>

            <Pressable style={styles.buttonModal} onPress={excluirFoto}>
              <Text style={styles.txRed}>Excluir foto</Text>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={modalSucesso}
          dismissable={false}
          contentContainerStyle={styles.modalSucesso}
        >
          <View style={styles.modal}>
            <LottieView
              source={require("../../../assets/img/sucesso.json")}
              autoPlay
              loop={false}
              style={{ width: 220, height: 220 }}
            />

            <View style={styles.textsModal}>
              <Text style={[styles.titulo, { fontSize: 25 }]}>
                Cadastro Realizado
              </Text>
              <Text style={[styles.subtitulo, { paddingHorizontal: 20 }]}>
                Sua conta foi criada com sucesso!
              </Text>
            </View>

            <Pressable style={styles.btnPurple} onPress={irLogin}>
              <Text style={styles.txWhite}>Ir para o Login</Text>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/img/arrow_2.png")}
            style={{ width: 20, height: 20 }}
            tintColor="#ccc"
          />
        </Pressable>
        <View
          style={styles.barra}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <Animated.View
            style={[
              styles.barraPurple,
              { transform: [{ translateX: animatedValue }] },
            ]}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.titulo}>Adicione sua foto de perfil</Text>

        <View style={styles.center}>
          <View style={styles.photoUpload}>
            <Pressable
              style={styles.upload}
              onPress={() => setModal(true)}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 75,
                  }}
                />
              ) : (
                <Image
                  source={require("../../../assets/img/icon2.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              )}
            </Pressable>
          </View>

          <Text style={styles.subtitulo}>Toque para adicionar uma foto</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            style={styles.btnPurple}
            onPress={() => finalizarCadastro(image)}
          >
            <Text style={styles.txWhite}>Concluir</Text>
          </Pressable>
          <Pressable onPress={() => finalizarCadastro(null)}>
            <Text style={styles.txGrey}>Pular por agora</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}