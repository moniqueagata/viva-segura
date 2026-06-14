import { View, Text, Pressable, Image, Dimensions, StyleSheet, useWindowDimensions, TextInput, Animated, ScrollView, Alert, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { Modal, Portal } from "react-native-paper";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef, useCallback } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import api from '../../services/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Painel
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_BOTTOM = (SCREEN_HEIGHT * 0.50) - 110;
const SNAP_TOP = 0;

// Icones - Locais Seguros
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

const ICONE_TIPO = {
  delegacia: <MaterialCommunityIcons name="police-station" size={18} color="#6925b8" />,
  estacao: <FontAwesome6 name="train-subway" size={15} color="#6925b8" />,
  apoio: <Foundation name="female-symbol" size={17} color="#6925b8" />,
  terminal: <FontAwesome5 name="bus" size={15} color="#6925b8" />,
  policia: <MaterialCommunityIcons name="police-station" size={18} color="#6925b8" />,
};
// ----------

export default function Mapa() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [modal, setModal] = useState(false);
  const [endereco, setEndereco] = useState('Obtendo endereço...');
  const [pesquisa, setPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [pontosRota, setPontosRota] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [rotaAtiva, setRotaAtiva] = useState(null);
  const [carregandoLocais, setCarregandoLocais] = useState(false);
  const [compartilhando, setCompartilhando] = useState(false);
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [coordenadasDestino, setCoordenadasDestino] = useState(null);
  const [distanciaAtual, setDistanciaAtual] = useState(null);

  // Modal seleção de guardiões - Compartilhar Localização
  const [modalGuardioes, setModalGuardioes] = useState(false);;
  const [guardioes, setGuardioes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [guardiaoCompartilhado, setGuardiaoCompartilhado] = useState(null);
  const [chegouAoDestino, setChegouAoDestino] = useState(false);

  // Animação do Painel
  const posicaoY = useRef(new Animated.Value(SNAP_BOTTOM)).current;
  const posicaoPainel = useRef(SNAP_BOTTOM);
  const ScrollViewRef = useRef(null);
  const [scrollAtivo, setScrollAtivo] = useState(false);
  const gesto = Animated.event(
    [{ nativeEvent: { translationY: posicaoY }}],
    { useNativeDriver: true }
  );

  const estadoPainel = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = event.nativeEvent;
      const posicao = posicaoPainel.current + translationY;
      let pontoDestino = SNAP_BOTTOM;

      if (posicao < SCREEN_HEIGHT * 0.45 || velocityY < -500) {
        pontoDestino = SNAP_TOP; // Sobe/Abre
      } else if (posicao >= SCREEN_HEIGHT * 0.45 || velocityY > 500) {
        pontoDestino = SNAP_BOTTOM; // Fecha
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
  // -----------

  // Buscar dados
  useEffect(() => {
    async function carregarDados() {
      const dados = await AsyncStorage.getItem("user");
      if (dados) {
        setUsuario(JSON.parse(dados));
      }
    }
    carregarDados();
  }, []);
  // --------

  // Localização + geocodificação reversa + envio à API
  useEffect(() => {
    let inscrito = true;
    let subscription = null;
    async function iniciarMonitoramento() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setEndereco('Permissão de localização negada');
        return;
      }
      const primeiraPosicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (primeiraPosicao && inscrito) {
        setLocation(primeiraPosicao.coords);
        atualizarEndereco(primeiraPosicao.coords);
        mapRef.current?.animateToRegion({
          latitude: primeiraPosicao.coords.latitude,
          longitude: primeiraPosicao.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (novaPosicao) => {
          if (inscrito) {
            setLocation(novaPosicao.coords);
            atualizarEndereco(novaPosicao.coords);
            enviarLocalizacaoAPI(novaPosicao.coords);

            if (coordenadasDestino && guardiaoCompartilhado?.length > 0) {
              const distancia = getDistance(
                { latitude: novaPosicao.coords.latitude, longitude: novaPosicao.coords.longitude },
                { latitude: coordenadasDestino.latitude, longitude: coordenadasDestino.longitude }
              );
              if (distancia <= 50 && !chegouAoDestino) {
                setChegouAoDestino(true);
                guardiaoCompartilhado.forEach(id_guardiao => {
                  api.post('/rota-compartilhada/chegou', {
                    id_usuaria: usuario.id_usuaria,
                    id_guardiao: id_guardiao,
                  }).catch(() => {});
                });
              }
            }
          }
        }
      );
    }
    iniciarMonitoramento();
    return () => {
      inscrito = false;
      if (subscription) subscription.remove();
    };
  }, [usuario]);

  const atualizarEndereco = async (coords) => {
    try {
      const [res] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude
      });

      if (res) {
        const rua = res.street || res.name || '';
        const bairro = res.district || res.subregion || '';
        setEndereco(rua && bairro ? `${rua}, ${bairro}` : rua || bairro || 'Endereço não encontrado');
      }
    } catch {
      setEndereco('Endereço indisponível');
    }
  };

  // GET /pontos-rota
  const carregarPontosRota = useCallback(async () => {
    setCarregandoLocais(true);
    try {
      const res = await api.get('/pontos-rota');
      setPontosRota(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.log('Erro ao carregar pontos:', e);
      setPontosRota([]);
    } finally {
      setCarregandoLocais(false);
    }
  }, []);

  // GET /alertas
  const carregarAlertas = useCallback(async () => {
    if (!location) return;
    try {
      const res = await api.get(`/alertas?latitude=${location.latitude}&longitude=${location.longitude}&raio=5`);
      setAlertas(Array.isArray(res.data) ? res.data : []);
    } catch {
      setAlertas([]);
    }
  }, [location]);

  // POST /localizacao
  const enviarLocalizacaoAPI = async (coords) => {
    console.log(Object.keys(usuario));
    if (!usuario?.id_usuaria) return;
    try {
      const response = await api.post('/localizacao', {
        id_usuaria: usuario.id_usuaria,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log("LOCALIZAÇÃO SALVA:", response.data);
    } catch (error) {
      console.log("ERRO COMPLETO:", error);
    }
  };
   
  useEffect(() => {
    carregarPontosRota();
    if (location) carregarAlertas();
    const intervalo = setInterval(() => {
      carregarPontosRota();
      if (location) carregarAlertas();
    }, 30000);
    return () => clearInterval(intervalo);
  }, [location, carregarPontosRota, carregarAlertas]);

  // POST /salvarPesquisaEndereco
  const salvarPesquisa = async (texto) => {
    if (!usuario?.id || !texto.trim()) return;
    try {
      await api.post('/salvarPesquisaEndereco', {
        id_usuaria: usuario.id,
        endereco: texto,
      });
    } catch { }
  };
  // -------

  // Filtra locais seguros conforme a usuária digita
  const filtroPesquisa = (texto) => {
    setPesquisa(texto);
    if (!texto.trim()) {
      setSugestoes([]);
      return;
    }
    const busca = texto.toLowerCase().trim();
    setSugestoes(
      pontosRota.filter((p) =>
        String(p.nome ?? '').toLowerCase().includes(busca) ||
        String(p.endereco ?? '').toLowerCase().includes(busca) ||
        String(p.tipo ?? '').toLowerCase().includes(busca)
      )
    );
  };

  const selecionarSugestao = (ponto) => {
    setPesquisa('');
    setSugestoes([]);
    const destLat = Number(ponto.latitude);
    const destLng = Number(ponto.longitude);
    if (isNaN(destLat) || isNaN(destLng)) {
      Alert.alert("Erro", "Coordenadas do local são inválidas.");
      return;
    }
    setEnderecoDestino(ponto.nome || ponto.endereco);
    setCoordenadasDestino({ latitude: destLat, longitude: destLng });
    setModal(true);

    if (location) {
      setDistanciaAtual(getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        { latitude: destLat, longitude: destLng }
      ));
    }
    tracarRota(destLat, destLng);
    salvarPesquisa(ponto.nome || ponto.endereco);
  };

  // Busca livre: qualquer endereço digitado
  const buscarEndereco = async () => {
    if (!pesquisa.trim()) return;
    setBuscando(true);

    try {
      const pontoEncontrado = pontosRota.find((p) =>
        (p.nome || '').toLowerCase().includes(pesquisa.toLowerCase().trim())
      );
      if (pontoEncontrado) {
        selecionarSugestao(pontoEncontrado);
        salvarPesquisa(pontoEncontrado.nome);
        return;
      }

      const resultados = await Location.geocodeAsync(`${pesquisa}, São Paulo, SP, Brasil`);
      if (resultados && resultados.length > 0) {
        const { latitude: lat, longitude: lng } = resultados[0];
        setEnderecoDestino(pesquisa);
        setCoordenadasDestino({ latitude: lat, longitude: lng });
        setModal(true);

        if (location) {
          setDistanciaAtual(getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: lat, longitude: lng }
          ));
        }
        tracarRota(lat, lng);
        salvarPesquisa(pesquisa);
      } else {
        Alert.alert('Nenhum resultado', 'Endereço não encontrado. Tente incluir o bairro.');
      }
    } catch {
      Alert.alert('Erro', 'Falha ao buscar endereço. Verifique sua conexão.');
    } finally {
      setBuscando(false);
    }
  };
  // -------

  // Rota traçada
  const tracarRota = async (destLat, destLng) => {
    if (!location) return;
    const origLat = location.latitude;
    const origLng = location.longitude;

    try {
      const url = `https://router.project-osrm.org/route/v1/foot/${origLng},${origLat};${destLng},${destLat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.code === 'Ok' && json.routes?.length > 0) {
      const coordenadas = json.routes[0].geometry.coordinates.map(
        ([lng, lat]) => ({ latitude: lat, longitude: lng })
      );
      setRotaAtiva(coordenadas);

      mapRef.current?.fitToCoordinates(coordenadas, {
        edgePadding: { top: 290, right: 20, bottom: 200, left: 20 },
        animated: true,
      });

      } else {
        const rotaSimples = [
          { latitude: origLat, longitude: origLng },
          { latitude: destLat, longitude: destLng },
        ];
        setRotaAtiva(rotaSimples);
        mapRef.current?.fitToCoordinates(rotaSimples, {
          edgePadding: { top: 290, right: 20, bottom: 200, left: 20 },
          animated: true,
        });
      }
    } catch {
      const rotaSimples = [
        { latitude: origLat, longitude: origLng },
        { latitude: destLat, longitude: destLng },
      ];
      setRotaAtiva(rotaSimples);
      mapRef.current?.fitToCoordinates(rotaSimples, {
        edgePadding: { top: 220, right: 20, bottom: 220, left: 20 },
        animated: true,
      });
    }
  };
  // ----------

  // Compartilhamento de rota - Modal
  // Guardiões vinculados a usuária
  useEffect(() => {
    async function carregarGuardioes() {
      if (!usuario?.id_usuaria) return;
      try {
        const res = await api.get(`/guardioes/${usuario.id_usuaria}`);
        console.log('STATUS:', res.status);
        console.log('DADOS:', JSON.stringify(res.data));
        console.log('Guardiões retornados:', JSON.stringify(res.data));
        setGuardioes(Array.isArray(res.data) ? res.data : []);
      } catch {
        console.log('Erro ao carregar guardiões:', e);
        setGuardioes([]);
      }
    }
    carregarGuardioes();
  }, [usuario]);

  const toggleSelecionado = (id_guardiao) => {
    setSelecionados(prev =>
      prev.includes(id_guardiao)
        ? prev.filter(id => id !== id_guardiao)
        : [...prev, id_guardiao]
    );
  };

  const concluirCompartilhamento = async () => {
    if (selecionados.length === 0) {
      Alert.alert('Atenção', 'Selecione ao menos um guardião');
      return;
    }
    if (!location || !coordenadasDestino) {
      Alert.alert('Erro', 'Localização ou destino indisponível');
      return;
    }
    try {
      await Promise.all(
        selecionados.map(id_guardiao =>
          api.post('/rota-compartilhada', {
            id_usuaria: usuario.id_usuaria,
            id_guardiao: id_guardiao,
            origemLatitude: location.latitude,
            origemLongitude: location.longitude,
            destinoLatitude: coordenadasDestino.latitude,
            destinoLongitude: coordenadasDestino.longitude,
            endereco_destino: enderecoDestino,
          })
        )
      );
      setGuardiaoCompartilhado(selecionados);
      setModalGuardioes(false);
      setSelecionados([]);
      Alert.alert('✅ Compartilhado', 'Seus guardiões foram notificados.');
    } catch {
      Alert.alert('Erro', 'Não foi possível compartilhar. Tente novamente.');
    }
  };
  // -------------

  // Animação na navegação
  const { width } = useWindowDimensions();
  const [medidas, setMedidas] = useState({});
  const [abaAtiva, setAbaAtiva] = useState(1);
  const larguraAba = 60;
  const posicaoX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const medidaAtual = medidas[abaAtiva];

    if (medidaAtual) {
      const { x, width } = medidaAtual;

      const destinoX = x + (width / 2) - (larguraAba / 2);

      Animated.spring(posicaoX, {
        toValue: destinoX,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    }
  }, [abaAtiva, medidas]);

  const abaLayout = (index, event) => {
    const { x, width } = event.nativeEvent.layout;
    setMedidas(prev => ({
      ...prev, [index]: { x, width }
    }));
  };

  const abas = [
    { label: 'Home', rota: "Home", imagem: require('../../../assets/img/home.png'), index: 0 },
    { label: 'Mapa', rota: "Mapa", imagem: require('../../../assets/img/map.png'), index: 1 },
    { label: 'Guardião', rota: "MeusGuardioes", imagem: require('../../../assets/img/angel.png'), index: 2 },
    { label: 'Você', rota: "Perfil", imagem: require('../../../assets/img/profile.png'), index: 3 }
  ];
  //----------

  const abrirPainel = () => {
    posicaoPainel.current = SNAP_TOP;
    posicaoY.setOffset(SNAP_TOP);
    posicaoY.setValue(0);

    Animated.spring(posicaoY, {
      toValue: 0,
      tension: 65,
      friction: 11,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: -23.5505,
              longitude: -46.6333,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={false}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.circle}>
                  {usuario?.foto ? (
                    <Image
                      source={{ uri: usuario.foto }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/img/icon2.png')}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </Marker>
            )}
            {rotaAtiva?.length > 0 && (
              <Marker
                key="destino"
                coordinate={rotaAtiva[rotaAtiva.length - 1]}
                title={enderecoDestino}
              >
                <MaterialIcons name="location-pin" size={33} color="#895ad4" />
              </Marker>
            )}
            {rotaAtiva && rotaAtiva.length > 0 && (
              <Polyline coordinates={rotaAtiva} strokeColor="#895ad4" strokeWidth={2} lineDashPattern={[0]} />
            )}
          </MapView>
          {/* Modal Topo -> cálculo de trajeto e compartilhamento */}
          {modal && (
            <View style={styles.modalContainer}>
              <View style={styles.modalTopo}>
                <View style={{ width: '100%', alignItems: 'flex-end'}}>
                  <Pressable onPress={() => { setModal(false); setRotaAtiva(null); setDistanciaAtual(null); }}>
                    <Feather name="x" size={17} color="#aaa" />
                  </Pressable>
                </View>
                <View style={styles.contentModal}>
                  <Text style={styles.endereço}>{enderecoDestino}</Text>
                  {distanciaAtual !== null && (
                    <Text style={styles.kmTempo}>32 min  •  {distanciaAtual >= 1000 ? `${(distanciaAtual / 1000).toFixed(1)} km` : `${distanciaAtual} metros`}</Text>
                  )}
                  <View style={styles.btnCompartilhar}>
                    <Text style={styles.text}>{'Deseja compartilhar\nseu trajeto?'}</Text>
                    <Pressable style={styles.button} onPress={() => setModalGuardioes(true)}>
                      <Text style={styles.txWhite}>Compartilhar</Text>
                    </Pressable>
                  </View>
                </View>
                {guardiaoCompartilhado?.length > 0 && (
                  <View style={{ width: '100%', marginVertical: 4, paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons name="people-sharp" size={15} color="#895ad4" />
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#895ad4' }}>Compartilhando com:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 7 }}>
                      {guardioes
                        .filter(g => guardiaoCompartilhado.includes(g.id) || guardiaoCompartilhado.includes(g.id_guardiao))
                        .map((g, index) => (
                          <View 
                            key={g.id ?? g.id_guardiao}
                            style={[styles.avatar, { marginLeft: index === 0 ? 0 : -7, zIndex: index }]}>
                            {g.foto ? (
                              <Image source={{ uri: g.foto }} 
                                style={{ width: '100%', height: '100%' }} 
                              />
                            ) : (
                              <Image source={require('../../../assets/img/icon2.png')} 
                                style={{ width: '100%', height: '100%' }} 
                                resizeMode="contain" 
                              />
                            )}
                          </View>
                        ))
                      }
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
          <PanGestureHandler
            onGestureEvent={gesto}
            onHandlerStateChange={estadoPainel}
            enabled={!scrollAtivo}
          >
            <Animated.View style={[styles.painel, { transform: [{ translateY: posicaoY }] }]}>
              <View style={{ width: '100%', alignItems: 'center', marginBottom: '4%' }} onTouchStart={() => setScrollAtivo(false)}>
                <View style={styles.puxador} />
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}
                ref={ScrollViewRef}
                onScroll={(event) => {
                  const y = event.nativeEvent.contentOffset.y;
                  if (y <= 0) {
                    setScrollAtivo(false);
                  } else {
                    setScrollAtivo(true);
                  }
                }}
                scrollEventThrottle={16}
              >
                <View style={styles.row}>
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
                      onChangeText={filtroPesquisa}
                      onSubmitEditing={buscarEndereco}
                      returnKeyType="search"
                      onFocus={abrirPainel}
                    />
                    {pesquisa.length > 0 && (
                      <Pressable style={styles.btnSearch} onPress={buscarEndereco}>
                        <Image source={require('../../../assets/img/send.png')} style={{ width: 15, height: 15 }} tintColor="#fff" />
                      </Pressable>
                    )}
                  </View>
                  <View style={styles.photoUpload}>
                    <View style={styles.upload}>
                      {usuario?.foto ? (
                        <Image
                          source={{ uri: usuario.foto }}
                          style={{ width: '100%', height: '100%' }}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/img/icon2.png')}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode='contain'
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.contentPainel} onTouchStart={() => setScrollAtivo(true)}>
                  {pesquisa.trim().length > 0 && (
                    <View style={styles.lista}>
                      {sugestoes.length > 0 ? (
                        sugestoes.map((item, index) => (
                          <Pressable key={`sugestao-${item.id ?? item.id_localSeguro ?? index}`} style={styles.card} onPress={() => selecionarSugestao(item)} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              {ICONE_TIPO[item.tipo]}
                              <Text style={styles.nomeLocal}>{item.nome}</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#808080' }}>{item.endereco}</Text>
                          </Pressable>
                        ))
                      ) : (
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#808080' }}>Local não encontrado</Text>
                      )}
                    </View>
                  )}
                </View>
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </View>
        <View style={styles.navegacao}>
          <Animated.View
            style={[styles.line,
            { width: larguraAba, transform: [{ translateX: posicaoX }] }
            ]}
          />
          {abas.map((aba) => (
            <Pressable
              key={aba.index}
              style={styles.buttonNav}
              onPress={() => {
                setAbaAtiva(aba.index);

                if (aba.rota) {
                  navigation.navigate(aba.rota);
                }
              }}
              onLayout={(event) => abaLayout(aba.index, event)}
            >
              <Image source={aba.imagem}
                style={{ width: 22, height: 22 }}
                tintColor={abaAtiva === aba.index ? '#ff80aa' : '#fff'}
                resizeMode='contain'
              />
              <Text style={[styles.textNav, abaAtiva === aba.index && { color: '#ff80aa' }]}>{aba.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* MODAIS - Seleção de guardião, Confirmação de compartilhamento de Trajeto e Conclusão de Trajeto */}
        <Modal
          visible={modalGuardioes}
          onDismiss={() => setModalGuardioes(false)}
          contentContainerStyle={styles.overlayModal}
        >
          <View style={styles.modal}>
            <Text style={styles.modalSubtitulo}>Escolha com quem você deseja compartilhar</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
              {guardioes.length === 0 ? (
                <Text style={{ textAlign: 'center', marginVertical: '10%', fontSize: 13, fontWeight: '300', color: '#aaa'}}>
                  Você ainda não tem guardiões confirmados
                </Text>
              ) : (
                guardioes.map((guardiao) => {
                    const selecionado = selecionados.includes(guardiao.id_guardiao);
                    return (
                      <Pressable 
                        key={guardiao.id_guardiao}
                        style={[styles.cardGuardiao, selecionado && { borderWidth: 1, borderColor: '#6925b8' }]}
                        onPress={() => toggleSelecionado(guardiao.id_guardiao)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15}}>
                          <View style={styles.fotoGuardiao}>
                            {guardiao.foto ? (
                              <Image
                                source={{ uri: guardiao.foto }}
                                style={{ width: '100%', height: '100%' }}
                              />
                            ) : (
                              <Image
                                source={require('../../../assets/img/icon2.png')}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="contain"
                              />
                            )}
                          </View>
                          <Text style={[styles.nomeGuardiao, selecionado && { color: '#6925b8' }]}>{guardiao.nome}</Text>
                        </View>
                        <View style={[styles.toogle, selecionado && { backgroundColor: '#6925b8', borderColor: 'transparent' }]}>
                          {selecionado && (
                            <Image
                              source={require('../../../assets/img/check.png')}
                              style={{ width: 10, height: 10 }}
                            />
                          )}
                        </View>
                      </Pressable>
                    )
                  })
              )}
            </ScrollView>
            <Pressable style={styles.btnConcluir} onPress={concluirCompartilhamento}>
              <Text style={styles.txWhite}>Concluir</Text>
            </Pressable>
          </View>
        </Modal>
        <Modal
          visible={chegouAoDestino}
          onDismiss={() => setChegouAoDestino(false)}
          contentContainerStyle={styles.overlayModal}
        >
          <View style={styles.modal}>
            <Text style={[styles.modalSubtitulo, { fontSize: 20, fontWeight: '700', color: '#6925b8'}]}>🎉 Você chegou ao destino!</Text>
            <Text style={{ marginBottom: '6%', textAlign: 'center', fontSize: 15, color: '#454545' }}>Deseja continuar compartilhando sua localização?</Text>
            <View style={{ flexDirection: 'row', gap: 22 }}>
              <Pressable
                style={[styles.btnConcluir, { backgroundColor: '#d13f3f' }]}
                onPress={async () => {
                  await Promise.all(
                    guardiaoCompartilhado.map(id_guardiao =>
                      api.post('/rota-compartilhada/encerrar', {
                        id_usuaria:  usuario.id_usuaria,
                        id_guardiao: id_guardiao,
                      }).catch(() => {})
                    )
                  );
                  setGuardiaoCompartilhado(null);
                  setChegouAoDestino(false);
                  setRotaAtiva(null);
                  setModal(false);
                }}
              >
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>Encerrar</Text>
              </Pressable>
              <Pressable style={styles.btnConcluir} onPress={() => setChegouAoDestino(false)}>
                <Text style={[styles.txWhite, { fontSize: 15, fontWeight: '500' }]}>Continuar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}
