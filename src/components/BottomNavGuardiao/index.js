import { View, Image, Pressable, Text, Animated, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import styles from "../BottomNavGuardiao/styles";

export default function BottomNavGuardiao({ abaAtivaInicial = 0 }) {
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
          { label: 'Home', rota: "HomeGuardiao", imagem: require('../../../assets/img/home.png'), index: 0 },
          { label: 'Chat', rota: "ChatGuardiao", imagem: require('../../../assets/img/message.png'), index: 1 },
          { label: 'Alertas', rota: "CentralEmergencia", imagem: require('../../../assets/img/mural.png'), index: 2 },
          { label: 'Você', rota: "PerfilGuardiao", imagem: require('../../../assets/img/profile.png'), index: 3 }
        ];
        //----------

    return (
        // <View style={{
        //     position: 'absolute',
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     flexDirection: 'row',
        //     justifyContent: 'space-around',
        //     alignItems: 'center',
        //     backgroundColor: '#87D3B6',
        //     height: 80,
        //     borderTopLeftRadius: 25,
        //     borderTopRightRadius: 25,
        // }}>

        //     <View style={{
        //         flexDirection: 'row',
        //         justifyContent: 'space-around',
        //         alignItems: 'center',
        //         backgroundColor: '#87D3B6',
        //         height: 80,
        //         borderTopLeftRadius: 25,
        //         borderTopRightRadius: 25,
        //         paddingHorizontal: 15,
        //         width: '100%'
        //     }}>

        //         {/* HOME */}
        //         <Pressable
        //             style={{
        //                 paddingHorizontal: 20,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 height: '100%', borderTopWidth: abaAtivaInicial === 0 ? 4 : 0,
        //                 borderTopColor: '#4B0082'
        //             }}
        //             onPress={() => navigation.navigate('HomeGuardiao')}
        //         >
        //             <Image
        //                 source={require('../../../assets/imgHomeGuardiao/home.png')}
        //                 style={{
        //                     width: 35,
        //                     height: 35,
        //                     tintColor: abaAtivaInicial === 0 ? '#4B0082' : '#FFFFFF'
        //                 }}
        //             />
        //         </Pressable>

        //         {/* CHAT */}
        //         <Pressable
        //             style={{
        //                 paddingHorizontal: 20,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 height: '100%',
        //                 borderTopWidth: abaAtivaInicial === 1 ? 4 : 0,
        //                 borderTopColor: '#4B0082'
        //             }}
        //             onPress={() => navigation.navigate('ChatGuardiao')}
        //         >
        //             <Image
        //                 source={require('../../../assets/imgHomeGuardiao/chat.png')}
        //                 style={{
        //                     width: 40,
        //                     height: 40,
        //                     tintColor: abaAtivaInicial === 1 ? '#4B0082' : '#FFFFFF'
        //                 }}
        //             />
        //         </Pressable>

        //         {/* MAPA */}
        //         <Pressable
        //             style={{
        //                 paddingHorizontal: 20,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 height: '100%',
        //                 borderTopWidth: abaAtivaInicial === 2 ? 4 : 0,
        //                 borderTopColor: '#4B0082'
        //             }}
        //             onPress={() => navigation.navigate('CentralEmergencia')}
        //         >
        //             <Image
        //                 source={require('../../../assets/imgHomeGuardiao/anjo.png')}
        //                 style={{
        //                     width: 50,
        //                     height: 50,
        //                     tintColor: abaAtivaInicial === 2 ? '#4B0082' : '#FFFFFF'
        //                 }}
        //             />
        //         </Pressable>

        //         {/* PERFIL */}
        //         <Pressable
        //             style={{
        //                 paddingHorizontal: 20,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 height: '100%',
        //                 borderTopWidth: abaAtivaInicial === 3 ? 4 : 0,
        //                 borderTopColor: '#4B0082'
        //             }}
        //             onPress={() => navigation.navigate('PerfilGuardiao')}
        //         >
        //             <Image
        //                 source={require('../../../assets/imgHomeGuardiao/meuPerfil.png')}
        //                 style={{
        //                     width: 40,
        //                     height: 40,
        //                     tintColor: abaAtivaInicial === 3 ? '#4B0082' : '#FFFFFF'
        //                 }}
        //             />
        //         </Pressable>

        //     </View>
        <View style={styles.navegacao}>
            <Animated.View style={[styles.line, { width: larguraAba, transform: [{ translateX: posicaoX }] }]} />
            {abas.map((aba) => (
                <Pressable
                    key={aba.index}
                    style={styles.buttonNav}
                    onPress={() => {
                        setAbaAtiva(aba.index);
                        if (aba.rota) { navigation.navigate(aba.rota)}
                    }}
                    onLayout={(event) => abaLayout(aba.index, event)}
                >
                    <Image source={aba.imagem}
                        style={{ width: 22, height: 22 }}
                        tintColor={abaAtiva === aba.index ? '#560192' : '#fff'}
                        resizeMode='contain'
                    />
                    <Text style={[styles.textNav, abaAtiva === aba.index && { color: '#560192' }]}>{aba.label}</Text>
                </Pressable>
            ))}
        </View>
    );
}