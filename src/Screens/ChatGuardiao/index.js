import { StatusBar } from 'expo-status-bar';
import { View, Image, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';
import BottomNavGuardiao from '../../components/BottomNavGuardiao';
import api from '../../services/api';

export default function ChatGuardiao() {
    const navigation = useNavigation();
    const [usuarios, setUsuarios] = useState([]);
    const [idGuardiao, setIdGuardiao] = useState(null);

    useEffect(() => {
        const carregarUsuarios = async () => {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                const usuarioConvertido = JSON.parse(user);
                setIdGuardiao(usuarioConvertido.id_usuaria);

                try {
                    const response = await api.get(`/guardiao/chat/${usuarioConvertido.id_usuaria}`);
                    console.log(response.data);
                    setUsuarios(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        carregarUsuarios();
    }, []);

return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Chat</Text>
                    <Text style={styles.subtitle}>Clique no card para conversar com a sua usuária protegida! </Text>
                </View>
                {Array.isArray(usuarios) &&
                usuarios.map((item) => (
                <Pressable
                    key={item.id}
                    style={styles.chatCard}
                    onPress={() => navigation.navigate("Mensagens", {
                            origem: "ChatGuardiao",
                            tipoUsuario: "guardiao",
                            contato: {
                                id_usuaria: item.id,
                                nome: item.nome,
                                foto: item.foto
                            }
                        })
                    }
                >
                    <View style={styles.avatarPlaceholder}>
                        <Image
                        source={
                            item.foto
                            ? { uri: item.foto }
                            : require("../../../assets/img/icon2.png")
                        }
                        style={styles.avatarImage}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>{item.nome}</Text>
                        <Text style={styles.lastMessage} numberOfLines={1}>Conversar com {item.nome}</Text>
                    </View>
                    <Text style={styles.statusText}>Chat</Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
        <BottomNavGuardiao abaAtivaInicial={1} />
    </SafeAreaView>
    );
}