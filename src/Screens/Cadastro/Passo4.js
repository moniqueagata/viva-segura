import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Animated, Alert } from "react-native";
import { Modal, Portal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from "react"
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from "./styles/styles_passo4";
import api from "../../services/api";

export default function Passo4() {
    const navigation = useNavigation();
    const [modal, setModal] = useState(false);
    const [image, setImage] = useState(null);
    const route = useRoute();
    
    const { 
      nome, 
      cpf, 
      dataNasc, 
      telefone, 
      email,
      perfilSelecionado,
      senha
    } = route.params || {};

    // Verificação
    const irParaPasso5 = () => {
      navigation.navigate("Passo5", {
        nome,
        cpf,
        email,
        senha,
        dataNasc: formatarData(dataNasc),
        telefone: telefone.replace(/\D/g, ''),
        id_role: perfilSelecionado === "guardiao" ? 2 : 1,
        foto: image || null
      });
    };   

    const formatarData = (data) => {
      const [dia, mes, ano] = data.split('/');
      return `${ano}-${mes}-${dia}`;
    };

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
          base64: false,
        });
  
        if (!resultado.canceled) {

          setImage(resultado.assets[0].uri);  
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
          quality: 0.03,         
          base64: true,
        });
    
        if (!resultado.canceled && resultado.assets.length > 0) {
          setImage(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
          setModal(false);
        }
      } catch (error) {
        console.log("Erro ao abrir a galeria:", error);
        Alert.alert("Erro", "Não foi possível abrir a galeria.");
      }
    };

    const exluirFoto = () => {
      setImage(null);
      setModal(false);
    };

    // Barra de progresso
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const [reactiveValue, setReactiveValue] = useState(-1000);
    const step = 4;
    const steps = 5;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: reactiveValue,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, [reactiveValue]);

    useEffect(() => {
      setReactiveValue(-width + (width * step) / steps);
    }, [step, width]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal visible={modal} dismissable={true} onDismiss={() => setModal(false)} contentContainerStyle={styles.modalContainer}>
          <View style={styles.modal}>
            <Pressable style={styles.buttonModal} onPress={tirarFoto}>
              <Image source={require('../../../assets/img/image.png')} 
                style={{ width: 22, height: 22 }} 
                tintColor='#717171'
              />
              <Text style={styles.txButton}>Tirar foto da câmera</Text>
            </Pressable>
            <Pressable style={styles.buttonModal} onPress={escolherDaGaleria}>
              <Image source={require('../../../assets/img/upload.png')} 
                style={{ width: 22, height: 22 }} 
                tintColor='#717171'
              />
              <Text style={styles.txButton}>Selecionar da galeria</Text>
            </Pressable>
            <Pressable style={styles.buttonModal} onPress={exluirFoto}>
              <Text style={styles.txRed}>Excluir foto</Text>
            </Pressable>
          </View>
        </Modal>
      </Portal>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Passo3')}>
          <Image source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 20, height: 20 }}
            tintColor='#ccc'
            resizeMode='contain' 
          />
        </Pressable>
        <View style={styles.barra}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <Animated.View
            style={[
              styles.barraPurple, { transform:[{ translateX: animatedValue }]}
            ]}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.titulo}>Adicione sua foto de perfil</Text>

        <View style={styles.center}>
          <View style={styles.photoUpload}>
            <Pressable style={styles.upload} onPress={() => setModal(true)}>
                {image ? (
                <Image 
                    source={{ uri: image }} 
                    style={{ width: '100%', height: '100%', borderRadius: 75 }} 
                />
                ) : (
                <Image source={require('../../../assets/img/icon2.png')} 
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='contain'
                />
                )}
            </Pressable>
          </View>
          <Text style={styles.subtitulo}>Toque para adicionar uma foto</Text>
        </View>

        <View style={styles.button}>
            <Pressable style={styles.btnPurple} onPress={() => irParaPasso5(image)}>
                <Text style={styles.txWhite}>Continuar</Text>
            </Pressable>
            <View style={styles.link}>
            <Pressable onPress={() => irParaPasso5(null)}>
                <Text style={styles.txGrey}>Pular por agora</Text>
            </Pressable>
        </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}