import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavGuardiao({ abaAtivaInicial = 0 }) {

    const navigation = useNavigation();

    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#87D3B6',
            height: 80,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
        }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#87D3B6',
                height: 80,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingHorizontal: 15,
                width: '100%'
            }}>

                {/* HOME */}
                <Pressable
                    style={{
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', borderTopWidth: abaAtivaInicial === 0 ? 4 : 0,
                        borderTopColor: '#4B0082'
                    }}
                    onPress={() => navigation.navigate('HomeGuardiao')}
                >
                    <Image
                        source={require('../../../assets/imgHomeGuardiao/home.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: abaAtivaInicial === 0 ? '#4B0082' : '#FFFFFF'
                        }}
                    />
                </Pressable>

                {/* CHAT */}
                <Pressable
                    style={{
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        borderTopWidth: abaAtivaInicial === 1 ? 4 : 0,
                        borderTopColor: '#4B0082'
                    }}
                    onPress={() => navigation.navigate('ChatGuardiao')}
                >
                    <Image
                        source={require('../../../assets/imgHomeGuardiao/chat.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: abaAtivaInicial === 1 ? '#4B0082' : '#FFFFFF'
                        }}
                    />
                </Pressable>

                {/* MAPA */}
                <Pressable
                    style={{
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        borderTopWidth: abaAtivaInicial === 2 ? 4 : 0,
                        borderTopColor: '#4B0082'
                    }}
                    onPress={() => navigation.navigate('CentralEmergencia')}
                >
                    <Image
                        source={require('../../../assets/imgHomeGuardiao/anjo.png')}
                        style={{
                            width: 50,
                            height: 50,
                            tintColor: abaAtivaInicial === 2 ? '#4B0082' : '#FFFFFF'
                        }}
                    />
                </Pressable>

                {/* PERFIL */}
                <Pressable
                    style={{
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        borderTopWidth: abaAtivaInicial === 3 ? 4 : 0,
                        borderTopColor: '#4B0082'
                    }}
                    onPress={() => navigation.navigate('PerfilGuardiao')}
                >
                    <Image
                        source={require('../../../assets/imgHomeGuardiao/meuPerfil.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: abaAtivaInicial === 3 ? '#4B0082' : '#FFFFFF'
                        }}
                    />
                </Pressable>

            </View>
        </View>
    );
}