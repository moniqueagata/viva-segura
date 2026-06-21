import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  Text,
  View,
  Animated,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput as PaperInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import styles from "./styles/styles_passo2";

export default function Passo2() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const route = useRoute();
  const perfilSelecionado = route.params?.perfilSelecionado;

  // Validação
  const formularioValido =
    nome.trim().length > 3 &&
    cpf.length === 14 &&
    dataNasc.length === 10 &&
    telefone.length >= 14 &&
    email.includes("@") &&
    email.includes(".");

  // Barra de progresso
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const [reactiveValue, setReactiveValue] = useState(-1000);
  const step = 2;
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
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['right', 'left', 'top']}>
        <KeyboardAvoidingView
          style={{  flex: 1, backgroundColor:'#fff' }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Pressable
                style={styles.btnExit}
                onPress={() => navigation.navigate("Passo1")}
              >
                <Image
                  source={require("../../../assets/img/arrow_2.png")}
                  style={{ width: 20, height: 20 }}
                  tintColor="#ccc"
                  resizeMode="contain"
                />
              </Pressable>
              <View
                style={styles.barra}
                onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
              >
                <Animated.View
                  style={[
                    styles.barraPurple,
                    { transform: [{ translateX: animatedValue }] },
                  ]}
                />
              </View>
            </View>
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/img/logo.png")}
                style={{ width: 130, height: 130 }}
                resizeMode="contain"
              />
            </View>
          <Text style={styles.subtitulo}>
                Preencha as informações que estão abaixo
              </Text>
            <View style={styles.inputsContainer}>
              <PaperInput
                label="Nome"
                mode="outlined"
                style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
                outlineColor="#ddd"
                activeOutlineColor="#6925b8"
                outlineStyle={{ borderRadius: 15 }}
                theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
                maxLength={80}
              />

              <PaperInput
                label="CPF"
                mode="outlined"
                style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
                outlineColor="#ddd"
                activeOutlineColor="#6925b8"
                outlineStyle={{ borderRadius: 15 }}
                theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
                value={cpf}
                onChangeText={(text) => setCpf(text)}
                keyboardType="numeric"
                render={(props) => <TextInputMask {...props} type={"cpf"} />}
              />

              <PaperInput
                label="Data de nascimento"
                mode="outlined"
                style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
                outlineColor="#ddd"
                activeOutlineColor="#6925b8"
                outlineStyle={{ borderRadius: 15 }}
                theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
                value={dataNasc}
                onChangeText={setDataNasc}
                keyboardType="numeric"
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"datetime"}
                    options={{ format: "DD/MM/YYYY" }}
                  />
                )}
              />

              <PaperInput
              label="Telefone"
                mode="outlined"
                style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
                left={<PaperInput.Affix text="+55" />}
                outlineColor="#ddd"
                activeOutlineColor="#6925b8"
                outlineStyle={{ borderRadius: 15 }}
                theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"cel-phone"}
                    options={{ maskType: "BRL", withDDD: true, dddMask: "(11) " }}
                  />
                )}
              />
              <PaperInput
                label="E-mail"
                mode="outlined"
                style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
                outlineColor="#ddd"
                activeOutlineColor="#6925b8"
                outlineStyle={{ borderRadius: 15 }}
                theme={{ colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" } }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                disabled={!formularioValido}
                style={[
                  styles.btnPurple,
                  {
                    backgroundColor: formularioValido ? "#6925b8" : "#c39fec"
                  }
                ]}
                onPress={() => {
                  navigation.navigate("Passo3", {
                    nome,
                    cpf: cpf.replace(/\D/g, ""),
                    dataNasc,
                    telefone,
                    email,
                    perfilSelecionado,
                  });
                }}
              >
                <Text style={styles.txWhite}>Continuar</Text>
              </Pressable>
            </View>
            <StatusBar style="auto" />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
