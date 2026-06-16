import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  Pressable,
  PanResponder,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";
import styles from "./styles";
import * as Battery from "expo-battery";
import api from '../../services/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // -> Icone Pin

export default function AcompanharRota() {
  const navigation = useNavigation();
  const route = useRoute();
  const { usuaria } = route.params;
  const [fotoGuardiao, setFotoGuardiao] = useState(null);
  const [fotoUsuaria, setFotoUsuaria] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [locationUsuaria, setLocationUsuaria] = useState(null);
  const [locationGuardiao, setLocationGuardiao] = useState(null);
  const [distancia, setDistancia] = useState(0);
  const [rua, setRua] = useState("");
  const [localizacaoTexto, setLocalizacaoTexto] = useState("");
  const [statusMovimento, setStatusMovimento] = useState("Parada");
  const [bateria, setBateria] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState("");
  const slideAnim = useRef(new Animated.Value(1000)).current;

  // Trajeto da usuária
  const mapRef = useRef(null);
  const [mapaPronto, setMapaPronto] = useState(false);
  const [rotaUsuaria, setRotaUsuaria] = useState([]);

  useEffect(() => {
    carregarTudo();
  }, []);

  // Quando o carregamento do mapa estivar pronto
  useEffect(() => {
    if (
      mapaPronto &&
      rotaUsuaria.length > 0
    ) {
      mapRef.current?.fitToCoordinates(rotaUsuaria, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 350,
          left: 50,
        },
        animated: true,
      });
    }
  }, [mapaPronto, rotaUsuaria]);

  const [horaInicio] = useState(
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  const carregarTudo = async () => {
    // FOTO DA USUÁRIA
    if (usuaria?.foto) {
      setFotoUsuaria(usuaria.foto);
    }
    // FOTO DO GUARDIÃO
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const usuarioConvertido = JSON.parse(user);
      if (usuarioConvertido?.foto) {
        setFotoGuardiao(usuarioConvertido.foto);
      }
    }

    // LOCALIZAÇÃO EM TEMPO REAL
    const permissao = await Location.requestForegroundPermissionsAsync();
    if (permissao.status !== "granted") {
      return;
    }
    const local = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const velocidade = local.coords.speed || 0;
    if (velocidade > 1) {
      setStatusMovimento("Em movimento");
    } else {
      setStatusMovimento("Parada");
    }

    // Localização do guardião
    const latitudeGuardiao = local.coords.latitude;
    const longitudeGuardiao = local.coords.longitude;
    setLocationGuardiao({
      latitude: latitudeGuardiao,
      longitude: longitudeGuardiao,
    });

    // Buscar localização da usuária
    try {
      const res = await api.get(`/localizacao/${usuaria.id_usuaria}`);
      const dados = res.data;
      const latitudeUsuaria = parseFloat(dados.latitude);
      const longitudeUsuaria = parseFloat(dados.longitude);
      setLocationUsuaria({
        latitude: latitudeUsuaria,
        longitude: longitudeUsuaria,
      });
      const distanciaReal = getDistance(
        { latitude: latitudeGuardiao, longitude: longitudeGuardiao },
        { latitude: latitudeUsuaria, longitude: longitudeUsuaria }
      );
      setDistancia(distanciaReal);
      setUltimaAtualizacao(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (error) {
      console.log('Erro ao buscar localização da usuária:', error);
    }

    try {
      const rotaRes = await api.get(`/rota-compartilhada/dados/${usuaria.id_usuaria}`);
      const rota = rotaRes.data.rota;

      const url = `https://router.project-osrm.org/route/v1/foot/${rota.origemLongitude},${rota.origemLatitude};${rota.destinoLongitude},${rota.destinoLatitude}?overview=full&geometries=geojson`;
      const osrmRes = await fetch(url);
      const osrmJson = await osrmRes.json();

      if (osrmJson.code === 'Ok' && osrmJson.routes?.length > 0) {
        const coordenadas = osrmJson.routes[0].geometry.coordinates.map(
          ([lng, lat]) => ({ latitude: lat, longitude: lng })
        );
        setRotaUsuaria(coordenadas);
      }
    } catch (error) {
      console.log('Erro ao buscar rota da usuária:', error);
    }
    
    const enderecoReal = await Location.reverseGeocodeAsync({
      latitude: latitudeGuardiao,
      longitude: longitudeGuardiao,
    });
    if (enderecoReal.length > 0) {
      const local = enderecoReal[0];
      setRua(`${local.street || "Rua"} ${local.streetNumber || ""}`);
      setLocalizacaoTexto(`${local.district || ""} • ${local.city || ""}`);
    }

    // Bateria do celular da usuária
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBateria(Math.round(batteryLevel * 100));
  };

  // Carregamento da tela
  if (!locationGuardiao || !locationUsuaria) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontSize: 20, color: '#43af86', fontWeight: '500'}}>Carregando mapa...</Text>
      </View>
    );
  }

  const abrirSheet = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fecharSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const ligar190 = async () => {
    try {
      await Linking.openURL("tel:190");
    } catch (error) {
      console.log("Erro ao abrir discador:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.botaoVoltar}
        onPress={() => navigation.navigate('HomeGuardiao')}
      >
        <Image
          source={require("../../../assets/img/arrow_2.png")}
          style={{ width: 18, height: 18 }}
          tintColor="#43af86"
          resizeMode="contain"
        />
      </Pressable>
      <MapView
        ref={mapRef}
        style={styles.map}
        onMapReady={() => setMapaPronto(true)}
      >
        <Marker coordinate={locationUsuaria}>
          <Image
            source={
              fotoUsuaria
                ? { uri: fotoUsuaria }
                : require("../../../assets/img/icon2.png")
            }
            style={[
              styles.markerImage,
              { borderColor: "#895ad4", borderWidth: 1 },
            ]}
          />
        </Marker>
        <Marker coordinate={locationGuardiao}>
          <Image
            source={
              fotoGuardiao
                ? { uri: fotoGuardiao }
                : require("../../../assets/img/icon2.png")
            }
            style={[
              styles.markerImage,
              { borderColor: "#56CDA6", borderWidth: 1 },
            ]}
          />
        </Marker>
        {/* Traçando a rota da usuária */}
        {rotaUsuaria.length > 0 && (
          <Polyline
            coordinates={rotaUsuaria}
            strokeColor="#895ad4"
            strokeWidth={2}
          />
        )}
        {rotaUsuaria.length > 0 && (
          <Marker
            coordinate={rotaUsuaria[rotaUsuaria.length - 1]}
            title="Destino"
          >
            <MaterialIcons name="location-pin" size={33} color="#895ad4" />
          </Marker>
        )}
        {/* -------- */}
      </MapView>
      <View style={styles.card}>
        <View style={styles.fotoContainer}>
          <Image
            source={
              fotoUsuaria
                ? { uri: fotoUsuaria }
                : require("../../../assets/img/icon2.png")
            }
            style={styles.fotoCard}
          />
        </View>
        <Text style={styles.nome}>{usuaria.nome}</Text>
        <Text style={styles.texto}>Compartilhando localização em tempo real</Text>
        <View style={{ width: '100%', paddingHorizontal: 6 }}>
          <View style={styles.distanciaBox}>
            <View style={styles.bolinhaVerde} />
            <Text style={styles.distanciaTexto}>{distancia}m de distância</Text>
          </View>
          <Text style={styles.cidade}>São Paulo</Text>
          <Text style={styles.cidade}>Desde às {horaInicio}</Text>
        </View>
        <Pressable style={styles.botaoAbrir} onPress={abrirSheet}>
          <Text style={styles.textoBotao}>Ver detalhes</Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <Pressable style={styles.overlay} onPress={fecharSheet} />
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
        <Pressable onPress={fecharSheet} style={styles.linha} />
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.rowTop}>
              <View>
                <Text style={styles.nomeModal}>{usuaria.nome}</Text>
                <Text style={styles.status}>● {statusMovimento}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{distancia}m</Text>
              </View>
            </View>

            <Text style={styles.endereco}>{rua}</Text>
            <Text style={styles.bairro}>{localizacaoTexto}</Text>

            <View style={styles.cardMini}>
              <View style={styles.infoLinha}>
                <Text style={styles.label}>Última atualização</Text>
                <Text style={styles.valor}>{ultimaAtualizacao}</Text>
              </View>
              <View style={styles.infoLinha}>
                <Text style={styles.label}>Compartilhando desde</Text>
                <Text style={styles.valor}>{horaInicio}</Text>
              </View>
              <View style={styles.infoLinha}>
                <Text style={styles.label}>Bateria</Text>
                <View style={styles.valorContainer}>
                  <View style={styles.bateriaIcone}>
                    <View style={[ styles.bateriaNivel, { width: `${bateria}%`},]}/>
                  </View>
                  <Text style={styles.valor}>{bateria}%</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardMapa}>
              <Pressable>
                <MapView
                  style={styles.mapMini}
                  region={{
                    latitude: locationGuardiao.latitude,
                    longitude: locationGuardiao.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker coordinate={locationUsuaria}>
                    <Image
                      source={
                        fotoUsuaria
                          ? { uri: fotoUsuaria }
                          : require("../../../assets/img/icon2.png")
                      }
                      style={styles.markerImage}
                    />
                  </Marker>
                </MapView>
              </Pressable>

              <View style={styles.mapaInfo}>
                <Text style={styles.endereco2}>
                  {rua || "Localização atual"}
                </Text>
                <Text style={styles.bairro2}>{localizacaoTexto}</Text>
                <Text style={styles.distanciaMapa}>
                  {distancia}m de distância
                </Text>
              </View>
            </View>
            <Pressable style={styles.botaoCompartilhar} onPress={ligar190}>
              <Text style={styles.botaoText}>Acionar SOS</Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}
