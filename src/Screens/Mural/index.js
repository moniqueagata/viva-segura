import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Linking, Pressable, RefreshControl, ScrollView, Share, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import { buscarNoticias, CATEGORIAS } from './services/apiMural';
import { obterFavoritos, obterCurtidas, alternarFavorito, alternarCurtida } from './services/storage';
import MenuLateral from './MenuLateral';
import styles from "./styles";
import BottomNav from "../../components/BottomNav";
import SOSButton from "../../components/SOSButton";

export default function Mural() {
  const navigation = useNavigation();
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
     console.log('ERRO STATUS:', error.response?.status);

 console.log('ERRO:', error.response?.data)
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
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [curtidas, setCurtidas] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const carregar = useCallback(async (categoriaId, termo) => {
    try {
      setErro(null);
      const dados = await buscarNoticias(categoriaId, termo);
      setNoticias(dados);
    } catch (e) {
      console.log('ERRO AO CARREGAR NOTICIAS:', e);
      setErro('Não foi possível carregar as notícias agora.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  const carregarSalvos = useCallback(async () => {
    setFavoritos(await obterFavoritos());
    setCurtidas(await obterCurtidas());
  }, []);

  useEffect(() => {
    setCarregando(true);
    carregar(categoriaAtiva, '');
    carregarSalvos();
  }, [categoriaAtiva, carregar, carregarSalvos]);

  const aoAtualizar = () => {
    setAtualizando(true);
    carregar(categoriaAtiva, busca);
  };

  const ehFavorito = (id) => favoritos.some((n) => n.id === id);
  const ehCurtido = (id) => curtidas.some((n) => n.id === id);

  const aoFavoritar = async (item) => setFavoritos(await alternarFavorito(item));
  const aoCurtir = async (item) => setCurtidas(await alternarCurtida(item));

  const aoCompartilhar = async (item) => {
    try {
      await Share.share({ message: `${item.titulo}\n${item.link}` });
    } catch (e) {
      console.log('ERRO AO COMPARTILHAR:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cabecalho}>
          <Pressable onPress={() => setMenuAberto(true)}>
            <Ionicons name="menu" size={26} color="#6925b8" />
          </Pressable>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Mural</Text>
            <Text style={styles.subtitulo}>
              Notícias selecionadas para você
            </Text>
          </View>          
          <View style={{ width: 26 }} />
        </View>

        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={styles.buscaInput}
            placeholder="Pesquisar notícias..."
            placeholderTextColor="#aaa"
            value={busca}
            onChangeText={setBusca}
            onSubmitEditing={() => { setCarregando(true); carregar(categoriaAtiva, busca); }}
            returnKeyType="search"
          />
        </View>

    <View style={styles.filtrosWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtrosContainer}
          >
            {CATEGORIAS.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.filtroChip, categoriaAtiva === cat.id && styles.filtroChipAtivo]}
                onPress={() => setCategoriaAtiva(cat.id)}
              >
                <Text style={[styles.filtroTexto, categoriaAtiva === cat.id && styles.filtroTextoAtivo]}>
                  {cat.emoji} {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {carregando ? (
          <ActivityIndicator size="large" color="#ff80aa" style={{ marginTop: 30 }} />
        ) : erro ? (
          <Text style={styles.erroTexto}>{erro}</Text>
        ) : (
          <FlatList
            data={noticias}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} colors={['#6925b8']} />
            }
            ListEmptyComponent={
              <View style={styles.vazio}>
                <Text style={styles.vazioTexto}>Nenhuma notícia encontrada.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={[styles.card, { borderLeftColor: item.cor }]}>
                <Pressable onPress={() => Linking.openURL(item.link)}>
                  <Text style={[styles.cardEyebrow, { color: item.cor }]}>
                    {item.categoriaLabel.toUpperCase()}
                  </Text>
                  <Text style={styles.cardTitulo}>{item.titulo}</Text>

                  <View style={styles.cardAssinatura}>
                    <View style={[styles.cardAvatar, { backgroundColor: item.corClara }]}>
                      <Text style={[styles.cardAvatarTexto, { color: item.cor }]}>{item.iniciais}</Text>
                    </View>
                    <Text style={styles.cardAssinaturaTexto}>{item.fonte}</Text>
                    <Text style={styles.cardAssinaturaPonto}>•</Text>
                    <Text style={styles.cardAssinaturaTexto}>{item.tempo}</Text>
                    <Text style={styles.cardAssinaturaPonto}>•</Text>
                    <Text style={styles.cardAssinaturaTexto}>{item.leitura}</Text>
                  </View>
                </Pressable>

                <View style={styles.cardAcoes}>
                  <Pressable style={styles.cardAcaoBtn} onPress={() => aoFavoritar(item)}>
                    <Ionicons name={ehFavorito(item.id) ? 'heart' : 'heart-outline'} size={20} color={ehFavorito(item.id) ? '#ff80aa' : '#999'} />
                  </Pressable>
                  <Pressable style={styles.cardAcaoBtn} onPress={() => aoCurtir(item)}>
                    <Ionicons name={ehCurtido(item.id) ? 'thumbs-up' : 'thumbs-up-outline'} size={20} color={ehCurtido(item.id) ? '#6925b8' : '#999'} />
                  </Pressable>
                  <Pressable style={styles.cardAcaoBtn} onPress={() => aoCompartilhar(item)}>
                    <Ionicons name="share-social-outline" size={20} color="#999" />
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>
      {/* Navegação */}
        <BottomNav abaAtivaInicial={3} />
      {/* --------- */}
      <MenuLateral visivel={menuAberto} onFechar={() => setMenuAberto(false)} favoritos={favoritos} curtidas={curtidas} />
    </View>
  );
}