import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, TextInput, Alert } from 'react-native';
import { Modal, Portal } from "react-native-paper";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function EditarPerfil() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({});
  const [modal, setModal] = useState(false);
  const [foto, setFoto] = useState(null);

  // Foto de perfil  
  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (camera.status !== 'granted' || galeria.status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'É necessário permitir o acesso à câmera e galeria.'
        );
        return false;
      }
      return true;
    };

  const tirarFoto = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    try{
      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        base64: true,
      });

      if (!resultado.canceled) {
        setFoto(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
        setModal(false);
      }
      console.log(resultado.assets);
    } catch (error) {
      console.log("Erro ao abrir a câmera:", error);
      Alert.alert("Erro","Não foi possível abrir a câmera.")
    }
  };

  const escolherDaGaleria = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        base64: true,
      });
  
      if (!resultado.canceled && resultado.assets.length > 0) {
        setFoto(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
        setModal(false);
      }
    } catch (error) {
      console.log("Erro ao abrir a galeria:", error);
      Alert.alert("Erro", "Não foi possível abrir a galeria.");
    }
  };

  const exluirFoto = () => {
    setFoto(null);
    setModal(false);
  };

  useEffect(() => {
    async function carregarUsuario() {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setUsuario(JSON.parse(user));
      }
    }
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (usuario?.foto) {
      setFoto(usuario.foto);
    }
  }, [usuario]);

  const salvar = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        alert("Usuário não encontrado");
        return;
      }
      const dados = JSON.parse(user);
      const response = await api.put(`/usuaria/${dados.id_usuaria}`, {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        foto: foto
      });

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );
      Alert.alert("Sucesso","Atualizado com sucesso!",
        [{ text: "OK", onPress: () => navigation.goBack()}]
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Erro ao atualizar");
    }
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal visible={modal} dismissable={false} contentContainerStyle={styles.modalContainer}>
            <View style={styles.modal}>
              <Pressable style={styles.buttonModal} onPress={tirarFoto}>
                <Image source={require('../../../assets/img/image.png')} 
                  style={{ width: 22, height: 22 }} 
                  tintColor='#717171'
                />
                <Text style={styles.txPurple}>Tirar foto da câmera</Text>
              </Pressable>
              <Pressable style={styles.buttonModal} onPress={escolherDaGaleria}>
                <Image source={require('../../../assets/img/upload.png')} 
                  style={{ width: 22, height: 22 }} 
                  tintColor='#717171'
                />
                <Text style={styles.txPurple}>Selecionar da galeria</Text>
              </Pressable>
              <Pressable style={styles.buttonModal} onPress={exluirFoto}>
                <Text style={styles.txRed}>Excluir foto</Text>
              </Pressable>
              <Pressable style={styles.buttonModal} onPress={() => setModal(false)}>
                <Text style={styles.txPurple}>Cancelar</Text>
              </Pressable>
            </View>
        </Modal>
      </Portal>
      <View style={styles.header}>
        <Pressable style={styles.buttonHeader} onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../../../assets/img/arrow_2.png')}
            style={{ width: 20, height: 20 }}
            tintColor='#6925b8'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Editar perfil</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.photoUpload}>
          <Pressable style={styles.upload} onPress={() => setModal(true)}>
            {foto ? (
                <Image
                    source={{ uri: foto}}
                    style={{ width: '100%', height: '100%', borderRadius: 75 }} 
                />
            ) : (
                <Image 
                    source={require('../../../assets/img/icon2.png')} 
                    style={{ width: '100%', height: '100%' }} 
                    resizeMode='contain' 
                />
            )}
          </Pressable>
          <Pressable style={styles.edit} onPress={() => setModal(true)}>
            <Image
              source={require('../../../assets/img/pen.png')}
              style={{ width: 20, height: 20 }}
              tintColor='#fff'
              resizeMode='contain'
            />
          </Pressable>
        </View>
        <View style={styles.gridInputs}>
          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={usuario.nome || ""}
              onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
            />
          </View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={usuario.email || ""}
              onChangeText={(text) => setUsuario({ ...usuario, email: text })}
            />
            <Image source={require('../../../assets/img/email_outline.png')}
              style={{ width: 23, height: 23, marginRight:40 }}
              tintColor='#bbb'
              resizeMode='cover'
            />
          </View>
          <Text style={styles.label}>Telefone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={usuario.telefone || ""}
              onChangeText={(text) => setUsuario({ ...usuario, telefone: text })}
            />
            <Image source={require('../../../assets/img/phone_outline.png')}
              style={{ width: 23, height: 23, marginRight:40  }}
              tintColor='#bbb'
              resizeMode='cover'
            />
          </View>
        </View>
        <Pressable style={styles.buttonPurple} onPress={salvar}>
          <Text style={styles.textWhite}>Salvar alterações</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}