import { StatusBar } from "expo-status-bar";
import { View, Image, Pressable, ScrollView, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import BottomNavGuardiao from "../../components/BottomNavGuardiao";

export default function PerfilGuardiao() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

  // Carregar dados
  useFocusEffect(
    useCallback(() => {
        const carregarUsuario = async () => {
        const dados = await AsyncStorage.getItem("user");
        if (dados) {
            setUsuario(JSON.parse(dados));
        }
        };
        carregarUsuario();
    }, [])
    );

  // Logout -> Sair da conta
    const fazerLogout = async () => {
        await AsyncStorage.removeItem("user");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

return (
  <View style={styles.container}>
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.photoUpload}>
            <View style={styles.upload}>
              {usuario?.foto ? (
                  <Image
                      source={{ uri: usuario.foto }}
                      style={{ width: '100%', height: '100%', borderRadius: 75 }} 
                  />
              ) : (
                  <Image 
                      source={require('../../../assets/img/icon2.png')} 
                      style={{ width: '100%', height: '100%' }} 
                      resizeMode='contain' 
                  />
              )}
              </View>
          </View>

          <View style={styles.text}>
            <Text style={styles.nome}>{usuario?.nome || "Nome"}</Text>
            <Text style={styles.desc}>Protegendo: 5 usuárias</Text>
          </View>

          <Pressable
            style={styles.buttonEdit}
            onPress={() => navigation.navigate("EditarPerfilGuardiao")}
          >
            <Text style={styles.textWhite}>Editar perfil</Text>
          </Pressable>
        </View>

        <View style={styles.settings}>
                <Text style={styles.sessions}>Preferências</Text>
                <View style={styles.gridButtons}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('NotificacoesGuardiao')}>
                        <View style={styles.grid}>
                            <View style={styles.circle}>
                                <Image source={require('../../../assets/img/sino.png')}
                                    style={{ width: 20, height: 20 }}
                                    tintColor='#808080'  
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.textButton}>Notificações</Text>
                        </View>
                        <Image source={require('../../../assets/img/arrow_2.png')}
                            style={{ width: 14, height: 14, transform: [{ scaleX: -1 }] }}
                            tintColor='#ccc'  
                        />
                    </Pressable>
                    <Pressable style={styles.button}>
                        <View style={styles.grid}>
                            <View style={styles.circle}>
                                <Image source={require('../../../assets/img/password.png')}
                                    style={{ width: 20, height: 20 }}
                                    tintColor='#808080'  
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.textButton}>Alterar senha</Text>
                        </View>
                        <Image source={require('../../../assets/img/arrow_2.png')}
                            style={{ width: 14, height: 14, transform: [{ scaleX: -1 }] }}
                            tintColor='#ccc'  
                        />
                    </Pressable>
                </View>

                <Text style={styles.sessions}>Suporte</Text>
                <View style={styles.gridButtons}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('CentralGuardiao')}>
                        <View style={styles.grid}>
                            <View style={styles.circle}>
                                <Image source={require('../../../assets/img/helpcenter.png')}
                                    style={{ width: 20, height: 20 }}
                                    tintColor='#808080'  
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.textButton}>Central de ajuda</Text>
                        </View>
                        <Image source={require('../../../assets/img/arrow_2.png')}
                            style={{ width: 14, height: 14, transform: [{ scaleX: -1 }] }}
                            tintColor='#ccc'  
                        />
                    </Pressable>
                    <Pressable style={styles.button}>
                        <View style={styles.grid}>
                            <View style={styles.circle}>
                                <Image source={require('../../../assets/img/terms.png')}
                                    style={{ width: 20, height: 20 }}
                                    tintColor='#808080'  
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.textButton}>Termos</Text>
                        </View>
                        <Image source={require('../../../assets/img/arrow_2.png')}
                            style={{ width: 14, height: 14, transform: [{ scaleX: -1 }] }}
                            tintColor='#ccc'  
                        />
                    </Pressable>
                </View>

                <View style={styles.logout}>
                    <Pressable style={styles.buttonLogout} onPress={fazerLogout}>
                        <Text style={styles.textRed}>Sair da conta</Text>
                    </Pressable>
                </View>

            </View>
      </View>
    </ScrollView>

      {/* Navegação */}
      <BottomNavGuardiao abaAtivaInicial={3} />
      {/* --------- */}
      <StatusBar style="auto" />
    </View>
  );
}