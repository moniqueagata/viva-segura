import { StatusBar } from "expo-status-bar";
import {
  Image,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput as PaperInput, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import api from "../../services/api";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validação de login
  const loginValido = email.includes("@") && senha.length >= 8;

  const verificaLogin = async () => {
    setLoading(true);

    try {
      console.log("email enviado:", email.trim());
      console.log("Senha enviada:", senha.trim());

        const response = await api.post("/login", {
        email: email.trim(),
        senha: senha.trim(),
        });

        console.log("RESPOSTA:", response.data);

        if (response.data.user) {
          const user = response.data.user;
            await AsyncStorage.setItem("user", JSON.stringify(user));

            console.log("USER SALVO NO STORAGE:", user);

            if (user.id_role === 2) {
                navigation.replace("HomeGuardiao");
            } else {
                navigation.replace("Home");
            }

            } else {
                alert("Senha incorreta");
            }

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("ERRO:", error.response?.data);
            console.log("MESSAGE:", error.message);
            alert("Erro ao fazer login.");
        } finally {
            setLoading(false);
        }
};

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logo}>
              <Image
                source={require("../../../assets/img/logo.png")}
                style={{ width: 160, height: 160 }}
              />
            </View>

            <Text style={styles.titulo}>Bem vinda(o) de volta!</Text>

            <View style={styles.inputsContainer}>

            <PaperInput
              label={<Text style={{ fontSize: 15, letterSpacing: 0.4 }}>E-mail</Text>}
              mode="outlined"
              style={{ backgroundColor: "#fff", height: 50, width: '95%' }}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              outlineColor="#ddd"
              activeOutlineColor="#6925b8"
              outlineStyle={{ borderRadius: 15 }}
              theme={{
                colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" },
              }}
            />

              <View style={styles.senhaContainer}>
                <PaperInput
                  label={
                    <Text style={{ fontSize: 15, letterSpacing: 0.4, letterSpacing: 0.4 }}>Senha</Text>
                  }
                  mode="outlined"
                  style={{ backgroundColor: "#fff", height: 50, width: '95%' }}
                  outlineColor="#ddd"
                  activeOutlineColor="#6925b8"
                  outlineStyle={{ borderRadius: 15 }}
                  theme={{
                    colors: { primary: "#6925b8", onSurfaceVariant: "#ccc" },
                  }}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  right={
                    <PaperInput.Icon
                      onPress={() => setMostrarSenha(!mostrarSenha)}
                      icon={mostrarSenha ? "eye" : "eye-off"}
                      color={mostrarSenha ? "#bbb" : "#6925b8"}
                    />
                  }
                />
                <Text style={styles.textEsqueciSenha}>Esqueceu a senha?</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.btnPurple, !loginValido && { opacity: 0.5 }]}
                onPress={verificaLogin}
                disabled={!loginValido || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.txWhite}>Entrar</Text>
                )}
              </Pressable>
            </View>

            <View style={styles.linkView}>
              <Text style={styles.txLink}>Ainda não possui conta?</Text>
              <Pressable onPress={() => navigation.navigate("Passo1")}>
                <Text style={styles.link}>Criar conta</Text>
              </Pressable>
            </View>

            <StatusBar style="auto" />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
