import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, Pressable, TextInput, Dimensions, Animated, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import styles from'./styles';
import api from "../../services/api";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_BOTTOM = SCREEN_HEIGHT * 0.65;
const SNAP_TOP = SCREEN_HEIGHT * 0.15;

const TIPOS = [
  { id: 'Casa', icone: <Ionicons name="home-sharp" size={22} color="#7859cc" /> },
  { id: 'Trabalho', icone: <Ionicons name="school" size={23} color="#7859cc" /> },
  { id: 'Escola', icone: <FontAwesome5 name="suitcase" size={22} color="#7859cc" /> },
  { id: 'Outro', icone: <Fontisto name="map-marker-alt" size={24} color="#7859cc" /> },
];

export default function EnderecoUsuaria() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [usuario, setUsuario] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  // Pesquisa input
  const [pesquisa, setPesquisa] = useState('');
  const [pesquisaAtiva, setPesquisaAtiva] = useState(false);
  const [pinSelecionado, setPinSelecionado] = useState(null);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('');
  const ignorarProximaMudanca = useRef(false);
  // Modais
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [nomeOutro, setNomeOutro] = useState('');
  const [complemento, setComplemento] = useState('');

  // Painel
  const posicaoY = useRef(new Animated.Value(SNAP_BOTTOM)).current;
   const posicaoPainel = useRef(SNAP_BOTTOM);
  const [scrollAtivo, setScrollAtivo] = useState(false);

  const gesto = Animated.event(
    [{ nativeEvent: { translationY: posicaoY } }],
    { useNativeDriver: true }
  );

  const estadoPainel = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = event.nativeEvent;
      const posicao = posicaoPainel.current + translationY;
      let pontoDestino = SNAP_BOTTOM;

      if (posicao < SCREEN_HEIGHT * 0.4 || velocityY < -500) {
        pontoDestino = SNAP_TOP;
      } else {
        pontoDestino = SNAP_BOTTOM;
      }

      posicaoPainel.current = pontoDestino;
      posicaoY.setOffset(pontoDestino);
      posicaoY.setValue(0);

      Animated.spring(posicaoY, { toValue: 0, tension: 65, friction: 11, useNativeDriver: true }).start();
    }
  };

  useEffect(() => {
    posicaoY.setOffset(SNAP_BOTTOM);
    posicaoY.setValue(0);
  }, []);
  // ---------

  // Carrega usuária + endereços salvos
  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem("user");
      if (dados) {
        const u = JSON.parse(dados);
        setUsuario(u);
        carregarEnderecos(u.id_usuaria);
      }
    };
    carregar();
  }, []);

  const carregarEnderecos = useCallback(async (id_usuaria) => {
    try {
      const res = await api.get(`/exibirEndereco/${id_usuaria}`);
      setEnderecos(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log("Erro ao carregar endereços:", err);
    }
  }, []);
  // ----------

  const [regiaoMapa, setRegiaoMapa] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Buscar endereço digitado
  const buscarEndereco = async () => {
    if (!pesquisa.trim()) return;

    try {
      const resultados = await Location.geocodeAsync(
        `${pesquisa}, São Paulo, SP, Brasil`
      );
      console.log("Pesquisado:", pesquisa);
      console.log("Resultado:", resultados[0]);

      if (resultados && resultados.length > 0) {
        const { latitude, longitude } = resultados[0];

        const novaRegiao = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setPesquisaAtiva(true);
        setPinSelecionado({ latitude, longitude });
        setEnderecoSelecionado(pesquisa);
        setRegiaoMapa(novaRegiao);
        mapRef.current?.animateToRegion(novaRegiao);
      } else {
        Alert.alert('Nenhum resultado', 'Endereço não encontrado. Tente incluir o bairro.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Falha ao buscar endereço.');
    }
  };

  const moverMapa = async (novaRegiao) => {
    console.log("pesquisaAtiva:", pesquisaAtiva);
    setRegiaoMapa(novaRegiao);

    setPinSelecionado({
      latitude: novaRegiao.latitude,
      longitude: novaRegiao.longitude,
    });

    if (ignorarProximaMudanca.current) {
      ignorarProximaMudanca.current = false;
      return;
    }

    try {
      const resultado = await Location.reverseGeocodeAsync({
        latitude: novaRegiao.latitude,
        longitude: novaRegiao.longitude,
      });

      if (resultado.length > 0) {
        const local = resultado[0];

      setEnderecoSelecionado(
        `${local.street || ''} ${local.streetNumber || ''}, ${local.district || ''}`.trim()
      );
      }
    } catch (erro) {
      console.log("Erro ao obter endereço:", erro);
    }
  };

  const concluirCadastro = async () => {
    if (!enderecoSelecionado) {
      Alert.alert(
        "Atenção",
        "Selecione um endereço no mapa antes de continuar."
      );
      return;
    }

    if (!tipoSelecionado) {
      Alert.alert('Atenção', 'Escolha um tipo de endereço.');
      return;
    }

    if (tipoSelecionado === 'Outro' && !nomeOutro.trim()) {
      Alert.alert('Atenção', 'Dê um nome para esse local.');
      return;
    }

    if (!usuario?.id_usuaria || !pinSelecionado) return;

    try {
      console.log("enderecoSelecionado:", enderecoSelecionado);
      console.log("pinSelecionado:", pinSelecionado);

      await api.post('/salvarEndereco', {
        id_usuaria: usuario.id_usuaria,
        endereco: enderecoSelecionado,
        complemento: complemento || null,
        descricao: tipoSelecionado === 'Outro' ? nomeOutro : tipoSelecionado,
        latitude: pinSelecionado.latitude,
        longitude: pinSelecionado.longitude,
      });

      setModalVisivel(false);
      setPinSelecionado(null);
      setPesquisa('');
      carregarEnderecos(usuario.id_usuaria);

    } catch (err) {
      console.log("Erro ao salvar endereço:", err.response?.data || err.message);
      Alert.alert('Erro', 'Não foi possível salvar o endereço.');
    }
  };

  const abrirModal = () => {
    setModalVisivel(true);
    setTipoSelecionado(null);
    setNomeOutro('');
    setComplemento('');
  };

  const iconePorTipo = (descricao) => {
    const tipo = TIPOS.find(t => t.id === descricao);
    return tipo ? tipo.icone : <Fontisto name="map-marker-alt" size={24} color="#7859cc" />;
  };
 
return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/img/arrow_2.png')} style={{width: 20, height: 20, tintColor: "#fff"}} />
        </Pressable>
        <Text style={styles.titulo}>Meus endereços</Text>   
      </View>
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={styles.mapa}
            initialRegion={regiaoMapa}
            onRegionChangeComplete={moverMapa}
          >
            {enderecos.map((item) => (
              item.latitude && item.longitude && (
                <Marker
                  key={item.id}
                  coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
                  title={item.descricao}
                >
                  <MaterialIcons name="location-pin" size={25} color="#a16cdf" />
                </Marker>
              )
            ))}
          </MapView>
          {/* Pin fixo no mapa */}
          {pinSelecionado && !modalVisivel && (
            <View style={styles.pinFixoContainer} pointerEvents="none">
              <MaterialIcons name="location-pin" size={40} color="#550FA4" />
            </View>
          )}
          {/* Mini card */}
          {pinSelecionado && !modalVisivel && (
            <View style={styles.miniCard}>
              <Text style={styles.miniCardTexto} numberOfLines={1}>
                Deseja adicionar como novo endereço?
              </Text>
              <Pressable style={styles.miniCardBtn} onPress={abrirModal}>
                <Text style={styles.miniCardBtnTexto}>Adicionar</Text>
              </Pressable>
            </View>
          )}
          <PanGestureHandler
            onGestureEvent={gesto}
            onHandlerStateChange={estadoPainel}
            enabled={!scrollAtivo}
          >
            <Animated.View style={[styles.painel, { transform: [{ translateY: posicaoY }] }]}>
              <View style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}
                onTouchStart={() => setScrollAtivo(false)}
              >
                <View style={styles.puxador} />
              </View>
              <View style={styles.inputContainer}>
                <Image source={require('../../../assets/img/lupa.png')}
                  style={{ width: 22, height: 22 }}
                  tintColor='#ddd'
                />
                <TextInput
                  style={styles.input}
                  placeholder='Procurar no mapa'
                  placeholderTextColor='#ccc'
                  value={pesquisa}
                  onChangeText={setPesquisa}
                  onSubmitEditing={buscarEndereco}
                  returnKeyType="search"
                />
                  <Pressable style={styles.btnSearch} onPress={buscarEndereco}>
                    <Image source={require('../../../assets/img/send.png')} style={{ width: 15, height: 15 }} tintColor="#fff" />
                  </Pressable>
              </View>
              <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                  const y = event.nativeEvent.contentOffset.y;
                  setScrollAtivo(y > 0);
                }}
                scrollEventThrottle={16}
              >
                <View style={{ width: '100%', marginTop: 15, paddingHorizontal: 5 }}>
                  {enderecos.map((item) => (
                    <Pressable
                      key={item.id}
                      style={styles.card}
                      onPress={() => {
                        if (item.latitude && item.longitude) {
                          mapRef.current?.animateToRegion({
                            latitude: Number(item.latitude),
                            longitude: Number(item.longitude),
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                          });
                        }
                      }}
                    >
                      <View style={styles.icone}>
                        {iconePorTipo(item.descricao)}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitulo}>{item.descricao}</Text>
                        <Text style={styles.cardSubtitulo} numberOfLines={1}>{item.endereco}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </View>
        {/* Modal */}
        {modalVisivel && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>Que tipo de lugar é esse?</Text>

              <View style={styles.chipsContainer}>
                {TIPOS.map((tipo) => (
                  <Pressable
                    key={tipo.id}
                    style={[styles.chip, tipoSelecionado === tipo.id && styles.chipAtivo]}
                    onPress={() => setTipoSelecionado(tipo.id)}
                  >
                    {React.cloneElement(tipo.icone, {
                      color: tipoSelecionado === tipo.id ? '#6925b8' : '#ccc'
                    })}
                    <Text style={[styles.chipTexto, tipoSelecionado === tipo.id && styles.chipTextoAtivo]}>
                      {tipo.id}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <TextInput
                style={styles.modalInput}
                placeholder="Nome do local"
                placeholderTextColor="#ccc"
                value={nomeOutro}
                onChangeText={setNomeOutro}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Complemento (opcional)"
                placeholderTextColor="#ccc"
                value={complemento}
                onChangeText={setComplemento}
              />
              <Pressable style={styles.btnConcluir} onPress={concluirCadastro}>
                <Text style={styles.btnConcluirTexto}>Concluir</Text>
              </Pressable>
              <Pressable style={{ marginVertical: 3 }} onPress={() => setModalVisivel(false)}>
                <Text style={styles.modalCancelar}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        )}
      <StatusBar style="auto" />
    </View>
  </GestureHandlerRootView>
  );
}