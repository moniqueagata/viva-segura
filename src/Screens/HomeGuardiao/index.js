import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable, ScrollView, Animated,  Easing, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomNavGuardiao from "../../components/BottomNavGuardiao";
import styles from "./styles";
import api from "../../services/api";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // -> Icone Pin

export default function HomeGuardiao() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [distancia, setDistancia] = useState("");
  const [nomeGuardiao, setNomeGuardiao] = useState("");
  const [fotoGuardiao, setFotoGuardiao] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  // Solicitação enviada pela usuária
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);

  // Alertas
  const [alertaPrincipal, setAlertaPrincipal] = useState(null);
  const [quantidadeAlertas, setQuantidadeAlertas] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animação do alerta - SOS
  useEffect(() => {
    if (alertaPrincipal) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [alertaPrincipal]);

  // Buscar alertas de SOS ativos
  const buscarAlertas = async () => {
    try {
      const res = await api.get("/botao-panico-ativos");
      const data = res.data;

      if (data && data.length > 0) {
        setAlertaPrincipal(data[0]); 
        setQuantidadeAlertas(data.length);
      } else {
        setAlertaPrincipal(null);
        setQuantidadeAlertas(0);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    buscarAlertas();
    const interval = setInterval(() => {
      buscarAlertas();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // -------

  // Buscar dados do guardião
  useEffect(() => {
    const carregarUsuario = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const usuarioConvertido = JSON.parse(user);
        setNomeGuardiao(usuarioConvertido.nome);
        setFotoGuardiao(usuarioConvertido.foto);
      }
    };
    carregarUsuario();
  }, []);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const usuarioConvertido = JSON.parse(user);
        console.log("USER COMPLETO:", usuarioConvertido);
        const idGuardiao = usuarioConvertido.id_usuaria;
        const json = await api.get(`/guardiao/home/${idGuardiao}`);
        console.log("RESPOSTA JSON:", json.data);
        setUsuarios(json.data.data);
      }
    };
    carregarUsuarios();
  }, []);
  // ---------

  // Solicitação de compartilhamento de trajeto 
  useEffect(() => {
    const carregarSolicitacoes = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) return;
      const { id_usuaria } = JSON.parse(user);
      try {
        const res = await api.get(`/rota-compartilhada/pendentes/${id_usuaria}`);
        setSolicitacoesPendentes(Array.isArray(res.data) ? res.data : []);
      } catch {
        setSolicitacoesPendentes([]);
      }
    };
    carregarSolicitacoes();
    const interval = setInterval(carregarSolicitacoes, 10000);
    return () => clearInterval(interval);
  }, []);

  const aceitarSolicitacao = async (id_rota) => {
    const user = await AsyncStorage.getItem('user');
    const { id_usuaria } = JSON.parse(user);
    try {
      await api.post('/rota-compartilhada/aceitar', {
        id_rota,
        id_guardiao: id_usuaria,
      });
      setSolicitacoesPendentes(prev => prev.filter(s => s.id_rota !== id_rota));
      const json = await api.get(`/guardiao/home/${id_usuaria}`);
      setUsuarios(json.data.data);
      console.log('HOME APÓS ACEITAR:', JSON.stringify(json.data));
    } catch (error){
      console.log('Erro ao aceitar:', error.response?.data || error.message);
    }
  };
  // --------

  // Geolocalização + Cálculo de distância
  useEffect(() => {
    const buscarLocalizacao = async () => {
      try {
         // LOCALIZAÇÃO DA USUÁRIA
        if (usuarios.length === 0) return; 
        const { id_usuaria } = usuarios[0].usuaria;
        const response = await api.get(`/localizacao/${id_usuaria}`);
        const dados = response.data;
        const latitudeUsuaria = parseFloat(dados.latitude);
        const longitudeUsuaria = parseFloat(dados.longitude);
        setLocation({
          latitude: latitudeUsuaria,
          longitude: longitudeUsuaria,
        });

        const enderecoConvertido = await Location.reverseGeocodeAsync({
          latitude: latitudeUsuaria,
          longitude: longitudeUsuaria,
        });
        if (enderecoConvertido.length > 0) {
          const local = enderecoConvertido[0];
          setEndereco(`${local.street || ""}, ${local.streetNumber || ""}`);
        }
        // LOCALIZAÇÃO DO GUARDIÃO
        const permissao = await Location.requestForegroundPermissionsAsync();
        if (permissao.status === "granted") {
          const localGuardiao = await Location.getCurrentPositionAsync({});
          const latitudeGuardiao = localGuardiao.coords.latitude;
          const longitudeGuardiao = localGuardiao.coords.longitude;
          const distanciaMetros = calcularDistancia(
            latitudeGuardiao,
            longitudeGuardiao,
            latitudeUsuaria,
            longitudeUsuaria,
          );
          setDistancia(Math.round(distanciaMetros));
        }
      } catch (error) {
        console.log("Erro:", error);
      }
    };
    buscarLocalizacao();
    const interval = setInterval(buscarLocalizacao, 5000);
    return () => clearInterval(interval);
  }, [usuarios]);

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const radiano = (grau) => grau * (Math.PI / 180);
    const dLat = radiano(lat2 - lat1);
    const dLon = radiano(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radiano(lat1)) *
      Math.cos(radiano(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  // -------

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={['bottom']}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => navigation.navigate("PerfilGuardiao")}>
            <View style={styles.upload}>
              {fotoGuardiao ? (
                <Image
                  source={{ uri: fotoGuardiao }}
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
          <Text style={styles.headerText}>Olá, {nomeGuardiao}</Text>
        </View>

        <View>
          <Pressable>
            <Image
              source={require("../../../assets/img/sino_1.png")}
              style={{ width: 22, height: 22, tintColor: "#87D3B6" }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {solicitacoesPendentes.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#454545', marginVertical: 3 }}>Solicitações pendentes</Text>
              {solicitacoesPendentes.map((solicitacao) => (
                <View key={solicitacao.id_rota} style={styles.cardSolicitacao}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={styles.fotoSolicitacao}>
                      {solicitacao.usuaria?.foto ? (
                        <Image
                          source={{ uri: solicitacao.usuaria.foto }}
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
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#4B0082' }}>{solicitacao.usuaria?.nome}</Text>
                      <Text style={{ fontSize: 11, color: '#bbb' }}>Quer compartilhar a rota com você</Text>
                      <Text style={{ fontSize: 12, color: '#888' }}>📍 {solicitacao.endereco_destino}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                    <Pressable
                      style={styles.btnRecusar}
                      onPress={() => setSolicitacoesPendentes(prev =>
                        prev.filter(s => s.id_rota !== solicitacao.id_rota)
                      )}
                    >
                      <Text style={{ color: '#fff', fontWeight: '500', fontSize: 14 }}>Recusar</Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnAceitar}
                      onPress={() => aceitarSolicitacao(solicitacao.id_rota)}
                    >
                      <Text style={{ color: '#fff', fontWeight: '500', fontSize: 14 }}>Aceitar</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
          {usuarios.map((item) => (
            <View key={item.id} style={styles.cardRota}>
              <View style={styles.row}>
                <View style={styles.fotoUsuaria}>
                  {item.usuaria?.foto ? (
                    <Image
                      source={{ uri: item.usuaria.foto }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/img/icon2.png")}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </View>
                <Text style={{ fontSize: 15, fontWeight: '500', color: '#318f7b', paddingLeft: 10 }}>Você está protegendo {item.usuaria.nome}</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <View style={{ width: 150, height: 150, borderRadius: 10, overflow: "hidden", backgroundColor: "#ddd" }}>
                  <View style={{ flex: 1 }}>
                    {location && (
                      <MapView
                        style={{ flex: 1 }}
                        region={{
                          latitude: location.latitude,
                          longitude: location.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        }}
                      >
                        <Marker coordinate={location}>
                          <MaterialIcons name="location-pin" size={33} color="#87D3B6" />
                        </Marker>
                      </MapView>
                    )}
                  </View>
                </View>
                <View style={{ flex: 1, paddingLeft: 15, justifyContent: "space-around" }}>
                  <Text style={{ color: "#a03e2d", fontSize: 13, lineHeight: 14 }}>{item.usuaria.nome} está a {distancia} metros de você</Text>
                  <Text style={{ color: "#777", fontSize: 12, marginTop: 6 }}>{endereco}</Text>
                  <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("AcompanharRota", {usuaria: item.usuaria})}
                  >
                    <Text style={styles.buttonText}>Acompanhar Rota</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* MODAL DE SOS */}
        {alertaPrincipal && (
          <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}>
            <Animated.View
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: 20,
                padding: 22,
                borderLeftWidth: 6,
                borderLeftColor: "#FF3B30",
                transform: [{ scale: pulseAnim }],
              }}
            >
              <Text style={{ fontSize: 26 }}>🚨</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Emergência Ativa</Text>
              <Text style={{ color: "#666", marginTop: 6 }}>{quantidadeAlertas} acionamentos de SOS</Text>

              <View style={{ marginTop: 15 }}>
                <View style={{ backgroundColor: "#F8F8F8", padding: 12, borderRadius: 12 }}>
                  <Text style={{ fontWeight: "bold" }}>{alertaPrincipal?.usuaria?.nome}</Text>
                  <Text style={{ color: "#777" }}>SOS ATIVO</Text>
                </View>
              </View>
              <Pressable onPress={() => navigation.navigate("CentralEmergencia")} style={{ marginTop: 15, backgroundColor: "#FF3B30", padding: 12, borderRadius: 10 }}>
                <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Ir para Central de Emergência</Text>
              </Pressable>

              <Pressable onPress={() => Linking.openURL("tel:190")} style={{ marginTop: 15, backgroundColor: "#FF3B30", padding: 12, borderRadius: 10 }}>
                <Text style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>Ligar 190</Text>
              </Pressable>

              <Pressable onPress={() => setAlertaPrincipal(null)} style={{ marginTop: 10, alignItems: "center" }}>
                <Text>Fechar</Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>
      {/* Navegação */}
      <BottomNavGuardiao abaAtivaInicial={0} />
      {/* --------- */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
