import { View, Image, Pressable, Text, Animated, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import styles from "../BottomNav/styles";

export default function BottomNav({ abaAtivaInicial = 0 }) {
  const navigation = useNavigation();

  // Animação na navegação
    const { width } = useWindowDimensions();
    const [medidas, setMedidas] = useState({});
    const [abaAtiva, setAbaAtiva] = useState(abaAtivaInicial);
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
      { label: 'Mural', rota: "Mural", imagem: require('../../../assets/img/mural.png'), index: 3 },
      { label: 'Você', rota: "Perfil", imagem: require('../../../assets/img/profile.png'), index: 4 }
    ];
    //----------

  return (
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
  );
}