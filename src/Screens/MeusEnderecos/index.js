import { StatusBar } from 'expo-status-bar';
import {View ,Image,Text,Pressable,FlatList ,Alert} from 'react-native';
import styles from'./styles';
import { useState,useEffect } from 'react';
import axios from 'axios';
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
export default function MeusEnderecos() {
   const [exibir, setExibir] = useState([]);
    const navigation = useNavigation();

useEffect(() => {
  exibirEndereco();
}, []);

const exibirEndereco = async () => {
  try {
    const response = await api.get("/exibirEndereco");

    setExibir(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/img/arrow_2.png')} style={{ width: 20, height: 20, tintColor: "#fff"}} />
        </Pressable>
        <Text style={styles.titulo}>Meus endereços</Text>    
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>Defina um endereço de sua escolha</Text>
        <FlatList
          style={{ flex: 1}}
          data={[...exibir].reverse()}
          keyExtractor={(item) => item.idEnderecoUsuaria.toString()}
          renderItem={({ item }) => (
          <View style={styles.card}>
            <MapView
              style={styles.mapa}
              initialRegion={{
                latitude: -23.5505,
                longitude: -46.6333,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
            <Text style={styles.tituloCasa}> {item.enderecoUsuaria}</Text>
            <Text style={styles.text}> {item.descricaoEnderecoUsuaria}</Text>
            <Pressable onPress={() => navigation.navigate('EditarEndereco', {
                idEnderecoUsuaria:  item.idEnderecoUsuaria,
                enderecoUsuaria: item.enderecoUsuaria,
                descricaoEnderecoUsuaria: item.descricaoEnderecoUsuaria
              })}>
              <Text style={styles.pontos}>...</Text>
            </Pressable>
        </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AdicionarEndereco')}>
            <Text style={styles.txWhite}>Adicionar</Text>
            <Image source={require('../../../assets/img/add.png')} style={{ width: 18, height: 18 }} />
        </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}