import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Switch,
  Modal,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import api from "../../../services/api";

export default function AddGuardiao() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [whats, setWhats] = useState(true);
  const [localizacao, setLocalizacao] = useState(true);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const salvarGuardiao = async () => {
    try {
      setLoading(true);

      // pega usuário logado
      const dados = await AsyncStorage.getItem("user");
      const usuario = JSON.parse(dados);

      // 1. envia email (convite)
      await api.post("/enviarConviteGuardiao", {
        id_usuaria: usuario.id_usuaria,
        nome_guardiao: nome,
        email_guardiao: email,
      });

      // 2. salva convite no banco (LISTAGEM)
      await api.post("/guardioes", {
        id_usuaria: usuario.id_usuaria,
        nome: nome,
        email: email,
      });

      setModal(true);

    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);

      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao enviar convite"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.modal}>
          <View style={styles.overlay}>
            <View style={styles.circleCheck}>
              <Image source={require('../../../../assets/img/check.png')} 
              style={{ width: 90, height: 90 }} 
              resizeMode='contain'
              />
            </View>
            <Text style={styles.tituloModal}>Guardião adicionado</Text> 
            <Text style={styles.subtitulo}>Codigo enviado para seu guardião!</Text> 
            <Pressable
              style={styles.buttonModal}
              onPress={() => {
                setModal(false);
                navigation.replace("MeusGuardioes");
              }}
            >
              <Text style={styles.txWhite}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.topo}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../../assets/img/arrow.png")}
            style={styles.seta}
          />
        </Pressable>
      </View>
      <View style={styles.header}>
        <Text style={styles.titulo}>Novo guardião</Text>
        <Image
          source={require("../../../../assets/img/angel.png")}
          style={styles.icon}
        />
      </View>
      <View style={styles.inputsContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.notificacaoContainer}>
        <Text style={styles.notificacaoTitulo}>🔔 Notificações</Text>
        <View style={styles.linha}>
          <Text style={styles.textoNotificacao}>Receber alertas via E-mail</Text>
          <Switch
            value={whats}
            onValueChange={setWhats}
          />
        </View>
        <View style={styles.linha}>
          <Text style={styles.textoNotificacao}>Compartilhar localização em tempo real</Text>
          <Switch
            value={localizacao}
            onValueChange={setLocalizacao}
          />
        </View>
      </View>
      <Pressable
        style={styles.botao}
        onPress={salvarGuardiao}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Enviando..." : "Adicionar guardião"}
        </Text>
      </Pressable>

    </View>
  );
}