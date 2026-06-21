import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, Pressable, TextInput, FlatList, Alert } from 'react-native';
import styles from'./styles';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect, } from 'react';
import api from "../../../services/api";

export default function AdicionarEndereco() {
  const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
  const [enderecoPesquisa, setEnderecoPesquisa] = useState("");
  const navigation = useNavigation();
  const [exibir, setExibir] = useState([]);

useEffect(() => {
  buscarEnderecosPesquisas();
}, []);

const buscarEnderecosPesquisas = async () => {
  try {
    const response = await api.get("/exibirPesquisaEndereco");

    setExibir(response.data.data);

  } catch (error) {
    console.log(error);
  }
};


   const salvarPesquisa = async () => {
  try {
    const dados = {
      enderecoPesquisa,
    };

    const response = await api.post("/salvarPesquisaEndereco", dados);

    console.log(response.data);


  } catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
}
};
  const salvarEnderecoSelecionado = async (endereco) => {
  try {
    const response = await api.post("/salvarEndereco", {
      enderecoUsuaria: endereco,
      complementoEnderecoUsuaria:'n',
      descricaoEnderecoUsuaria:'n',
    });

    console.log("SALVOU:", response.data);

    Alert.alert("Salvo", "Endereço adicionado!");

  } catch (error) {
    console.log("ERRO COMPLETO:", error.response?.data || error);

    Alert.alert(
      "Erro",
      error.response?.data?.error || "Erro ao salvar"
    );
  }
};
    
return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Pressable style={styles.buttonExit} onPress={() => navigation.navigate('MeusEnderecos')}>
        <Image source={require('../../../../assets/img/arrow_2.png')} style={{ width: 18, height: 18, tintColor: "#550FA4"}} />
      </Pressable>   
    </View>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
    <View style={styles.painel}>
      {/* Informções do painel */}
    </View>
    <StatusBar style="auto" />
  </View>
  );
}