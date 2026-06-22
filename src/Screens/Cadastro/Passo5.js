import { StatusBar } from 'expo-status-bar';
import { useEffect, useState , useRef} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Image, View, Text, Pressable, Animated} from 'react-native';
import { TextInput as PaperInput, Modal, Portal  } from 'react-native-paper';
import styles from './styles/styles_passo5';
import api from '../../services/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

export default function Passo5() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modal, setModal]= useState(false);
  const [nomeGuardiao, setNomeGuardiao] = useState('');
  const [emailGuardiao, setEmailGuardiao] = useState('');

  const {
    nome,
    cpf,
    email,
    senha,
    dataNasc,
    telefone,
    foto,
  } = route.params || {};

  // Verificação 
  const finalizarCadastro = async () => {
    try {
      const dados = {
        usuaria: {
          nome,
          cpf,
          email,
          senha,
          telefone,
          dataNasc,
          id_role: 1,
          foto: foto || null
        },
        guardiao: {
          nome: nomeGuardiao,
          email: emailGuardiao,
          id_role: 2
        }
      };
      console.log("Enviando dados completos para a API:", dados);
      const response = await api.post("/cadastrar", dados);
      console.log("Sucesso:", response.data);
      setModal(true);

    } catch (error) {
      console.log("ERRO NO CADASTRO:", error);

      if (error.response) {
        console.log("BACKEND:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  const irParaLogin = () => {
    setModal(false);
    navigation.navigate('Login');
  };
  //----------

  // Barra de progresso
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const [reactiveValue, setReactiveValue] = useState(-1000);
    const step = 5;
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
    <View style={styles.header}>
      <Pressable onPress={() => navigation.navigate('Passo4')}>
        <Image source={require('../../../assets/img/arrow_2.png')} 
          style={{ width: 20, height: 20 }}
          tintColor='#ccc'
          resizeMode='contain' 
        />
      </Pressable>
      <View style={styles.barra} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <Animated.View
          style={[
            styles.barraPurple, { transform:[{ translateX: animatedValue }]}
          ]}
        />
      </View>
    </View>
    <View style={styles.content}>
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={{ width: 130, height: 130 }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.titulo} >Adicione um guardião</Text> 
      <Text  style={styles.subtitulo}>Seu guardião receberá um e-mail para concluir o cadastro e acompanhar você no aplicativo.</Text> 
      <View style={styles.inputsContainer}>
        <PaperInput
          label={
            <Text style={{ fontSize: 15, letterSpacing: 0.4 }}>Nome do guardião</Text>
          }
          mode="outlined"
          style={{ backgroundColor: '#fff', height: 50, width: '95%' ,alignSelf:'center'}}
          outlineColor="#ddd"
          activeOutlineColor="#6925b8"
          outlineStyle={{ borderRadius: 15 }}
          theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
          value={nomeGuardiao}
          onChangeText={setNomeGuardiao}
          autoCapitalize="words"
          maxLength={80}
        />
        <PaperInput
          label={
            <Text style={{ fontSize: 15, letterSpacing: 0.4 }}>E-mail</Text>
          }
          mode="outlined"
          style={{ backgroundColor: '#fff', height: 50, width: '95%',alignSelf:'center' }}
          outlineColor="#ddd"
          activeOutlineColor="#6925b8"
          outlineStyle={{ borderRadius: 15 }}
          theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
          value={emailGuardiao}
          onChangeText={setEmailGuardiao}
          autoCapitalize="words"
          maxLength={80}
        />
      </View>
      <View style={styles.viewAtencao}>
        <AntDesign name="exclamation-circle" size={20} color="#510da0" />
        <Text style={styles.textAlerta}>Um convite será enviado automaticamente para este e-mail.</Text>
      </View>
      <View style={styles.button}>
        <Pressable style={styles.btnPurple} onPress={finalizarCadastro}>
          <Text style={styles.txWhite}>Concluir</Text>
        </Pressable>
      </View>
        {/* MODAL CONFIRMAÇÃO */}
        <Portal>
          <Modal visible={modal} dismissable={false} contentContainerStyle={styles.modalSucesso}>
            <View style={styles.modal}>
              <LottieView
                source={require('../../../assets/img/sucesso.json')} 
                autoPlay
                loop={false}
                style={{ width: 220, height: 220 }}
              />
              <View style={styles.textsModal}>
                <Text style={[styles.titulo, { fontSize: 25 }]}>Cadastro Realizado</Text>
                <Text style={[styles.subtitulo, { paddingHorizontal: 20 }]}>Sua conta foi criada com sucesso!</Text>
              </View>

              <Pressable style={styles.btnPurple} onPress={irParaLogin}>
                <Text style={styles.txWhite}>Ir para o Login</Text>
              </Pressable>
            </View>
          </Modal>
        </Portal>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}