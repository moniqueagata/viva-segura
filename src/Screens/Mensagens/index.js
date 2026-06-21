import React, { useEffect, useState, useRef } from 'react';
import { View, Image, ScrollView, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import styles from './styles';
import api from "../../services/api";

const formatarHorario = (dataString) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
};

export default function Mensagens() {
    const navigation = useNavigation();
    const route = useRoute();

    const contato = route.params?.contato;
    const tipoUsuario = route.params?.tipoUsuario;
    const origem = route.params?.origem;

    const scrollRef = useRef();

    const [mensagens, setMensagens] = useState([]);
    const [texto, setTexto] = useState("");
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    const getBubbleStyle = (msg) => {
        const enviadoPorUsuaria = msg.enviado_por === "usuario";

        if (tipoUsuario === "usuario") {
            return enviadoPorUsuaria ? styles.sentBubble : styles.receivedBubble;
        } else {
            return enviadoPorUsuaria ? styles.guardianReceivedBubble : styles.guardianSentBubble;
        }
    };

    // ─── CARREGAR USUÁRIO ────────────────────────────────────────
    useEffect(() => {
        const carregarUsuario = async () => {
            const dados = await AsyncStorage.getItem("user");
            if (dados) {
                const usuario = JSON.parse(dados);
                setUsuarioLogado(usuario);
            }
        };
        carregarUsuario();
    }, []);

    // ─── BUSCAR MENSAGENS ────────────────────────────────────────
    useEffect(() => {
        if (!usuarioLogado || !contato) return;
        buscarMensagens();
        const interval = setInterval(buscarMensagens, 5000);
        return () => clearInterval(interval);
    }, [usuarioLogado, contato]);

    const buscarMensagens = async () => {
        if (!usuarioLogado || !contato) return;

        const idUsuario =
            tipoUsuario === "usuario"
                ? usuarioLogado.id_usuaria
                : contato.id_usuaria;

        const idGuardiao =
            tipoUsuario === "guardiao"
                ? usuarioLogado.id_usuaria
                : contato.id_usuaria;

        if (!idUsuario || !idGuardiao) return;

        try {
            const res = await api.get(`/mensagens/${idUsuario}/${idGuardiao}`);
            setMensagens(res.data);
        } catch (error) {
            console.log("ERRO AO BUSCAR MENSAGENS:", error);
        }
    };

    // ─── ENVIAR MENSAGEM ─────────────────────────────────────────
    const enviarMensagem = async (textoCustom = null) => {
        const conteudo = textoCustom ?? texto;
        if (!conteudo.trim()) return;

        const idUsuario =
            tipoUsuario === "usuario"
                ? usuarioLogado.id_usuaria
                : contato.id_usuaria;

        const idGuardiao =
            tipoUsuario === "guardiao"
                ? usuarioLogado.id_usuaria
                : contato.id_usuaria;

        try {
            await api.post("/mensagens", {
                texto: conteudo,
                usuario_id: idUsuario,
                guardiao_id: idGuardiao,
                enviado_por: tipoUsuario
            });

            if (!textoCustom) setTexto("");
            buscarMensagens();

        } catch (error) {
            console.log("ERRO AO ENVIAR MENSAGEM:", error);
        }
    };

    // ─── SOS NO CHAT ─────────────────────────────────────────────


    const dispararSosChat = async () => {
        try {
            const permissao = await Location.requestForegroundPermissionsAsync();

            if (permissao.status !== "granted") {
                Alert.alert("Permissão negada", "Precisamos da sua localização para enviar o SOS.");
                return;
            }

            const local = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = local.coords;

            const linkMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const mensagemSOS = `🚨 SOS! Preciso de ajuda! Minha localização agora: ${linkMaps}`;

            await enviarMensagem(mensagemSOS);

            Alert.alert("🚨 SOS enviado!", "Sua localização foi compartilhada no chat.");

        } catch (err) {
            console.log("Erro SOS chat:", err);
            Alert.alert("Erro", "Não foi possível enviar o SOS.");
        }
    };

    // ─── RENDER ──────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <StatusBar style="dark" />

                {/* HEADER */}
                <View style={styles.header}>
                    <Pressable
                        onPress={() => navigation.navigate(origem)}
                        style={styles.backButton}
                    >
                        <Image
                            source={require('../../../assets/img/arrow_2.png')}
                            style={{ width: 20, height: 20 }}
                            tintColor='#6925b8'
                        />
                    </Pressable>

                    <View style={styles.avatarCircle}>
                        {contato?.foto ? (
                            <Image
                                source={{ uri: contato.foto }}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={require("../../../assets/img/angel.png")}
                                style={styles.avatarImage}
                                resizeMode="contain"
                                tintColor="#4B0082"
                            />
                        )}
                    </View>

                    <Text style={styles.headerName}>{contato?.nome}</Text>
                </View>

                {/* MENSAGENS */}
                <ScrollView
                    ref={scrollRef}
                    style={styles.chatArea}
                    contentContainerStyle={styles.chatContent}
                    onContentSizeChange={() =>
                        scrollRef.current?.scrollToEnd({ animated: true })
                    }
                >
                    {mensagens.map((msg) => (
                        <View
                            key={msg.id}
                            style={[styles.bubble, getBubbleStyle(msg)]}
                        >
                            <Text style={styles.messageText}>{msg.texto}</Text>
                            <Text style={styles.messageTime}>
                                {formatarHorario(msg.created_at)}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                {/* INPUT */}
                <View style={styles.footer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.inputField}
                            value={texto}
                            onChangeText={setTexto}
                                autoFocus={true}

                        />

                        {/* BOTÃO SOS — só aparece para a usuária */}
                        {tipoUsuario === "usuario" && (
                            <Pressable
                                style={styles.sosButtonChat}
                                onPress={dispararSosChat}
                            >
                                <Text style={styles.sosButtonText}>SOS</Text>
                            </Pressable>
                        )}
                    </View>

                    <Pressable
                        style={styles.sendCircleButton}
                        onPress={() => enviarMensagem()}
                    >
                        <Text style={styles.sendIconArrow}>↑</Text>
                    </Pressable>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}