import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, FlatList, useWindowDimensions, Animated, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { StatusBar } from "expo-status-bar";
import BottomNav from "../../components/BottomNav";
import SOSButton from "../../components/SOSButton";

export default function MeusGuardioes() {
  const navigation = useNavigation();

  const [guardioes, setGuardioes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState(null);

  // pega usuário logado
  useEffect(() => {
    const carregarUser = async () => {
      const dados = await AsyncStorage.getItem("user");
      const usuario = JSON.parse(dados);

      setIdUsuario(usuario.id_usuaria);
    };

    carregarUser();
  }, []);

  // busca guardiões quando tiver id
  useEffect(() => {
    if (idUsuario) {
      carregarGuardioes();
    }
  }, [idUsuario]);

  const carregarGuardioes = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/guardioes/${idUsuario}`);
          console.log(response.data);


      setGuardioes(response.data);

    } catch (error) {
      console.log("ERRO AO CARREGAR:", error);
    } finally {
      setLoading(false);
    }
  };

  const removerGuardiao = async (id) => {
    try {
      await api.delete(`/guardioes/${idUsuario}/${id}`);

      carregarGuardioes();

    } catch (error) {
      console.log("ERRO AO REMOVER:", error);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Meus guardiões</Text>

          <Image
            source={require("../../../assets/img/angel.png")}
            style={styles.tituloIcon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitulo}>
          Convites enviados por email para seus guardiões.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ff80aa" />
        ) : (
          <FlatList
            data={guardioes}
            keyExtractor={(item) => item.id_guardiao.toString()}

            ListEmptyComponent={
              <View style={styles.vazio}>
                <Image
                  source={require("../../../assets/img/angel.png")}
                  style={{ width: 48, height: 48 }}
                  tintColor="#ccc"
                />
                <Text style={styles.vazioTexto}>
                  Nenhum convite enviado ainda.
                </Text>
              </View>
            }

            renderItem={({ item }) => (

              <View style={styles.card}>

                <View style={styles.cardInfo}>
                  <View style={styles.cardTopo}>
                    <Text style={styles.cardNome}>{item.nome}</Text>
                    <Text style={styles.badge}>Ativa</Text>
                  </View>


                  <Text style={styles.cardTelefone}>{item.email}</Text>
                </View>

                <View style={styles.cardAcoes}>

                  <Pressable
                    style={styles.btnChat}
                    onPress={() =>
                      navigation.navigate('Mensagens', {
                        origem: 'MeusGuardioes',
                      })
                    }
                  >
                    <Text style={styles.btnChatText}>
                      chat
                    </Text>
                  </Pressable>

                  <Pressable style={styles.btnRemover} >
                    <Text style={styles.btnRemoverTexto}>
                      ✕
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
        <Pressable
          style={styles.botao}
          onPress={() => navigation.navigate("AddGuardiao")}
        >
          <Text style={styles.buttonText}>Novo Guardião +</Text>
        </Pressable>
      </View>
      {/* Botão de SOS */}
        <SOSButton />
      {/* Navegação */}
      {/* Navegação */}
      <BottomNav abaAtivaInicial={2} />
      {/* --------- */}
      <StatusBar style="auto" />
    </View>
  );
}