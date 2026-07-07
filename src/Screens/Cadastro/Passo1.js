import { StatusBar } from "expo-status-bar";
import { Image, View, Text, Pressable, Animated, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/styles_passo1";
import { useState, useRef, useEffect } from "react";

export default function Passo1() {
  const navigation = useNavigation();
  const [perfil, setPerfil] = useState(null);

  // Barra de progresso
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const [reactiveValue, setReactiveValue] = useState(-1000);
  const step = 1;
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
        <Pressable
          style={styles.btnExit}
          onPress={() => navigation.navigate("Welcome")}
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

      <Text style={styles.titulo}>Escolha seu perfil</Text>

      <View style={styles.cardContainer}>

        <Pressable
          onPress={() => setPerfil("usuaria")}
          style={[
            styles.cardPerfil,
            perfil === "usuaria" && styles.cardSelecionado,
          ]}
        >
          <Image
            source={require("../../../assets/img/woman.png")}
            style={{ width: 88, height: 88 }}
            resizeMode="contain"
          />
          <View style={styles.texts}>
            <Text style={styles.tipo}>Usuária</Text>
            <Text style={styles.desc}>
              Permita que pessoas de confiança acompanhem você
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setPerfil("guardiao")}
          style={[
            styles.cardPerfil,
            perfil === "guardiao" && styles.cardSelecionado,
          ]}
        >
          <Image
            source={require("../../../assets/img/men.png")}
            style={{ width: 88, height: 88 }}
            resizeMode="contain"
          />
          <View style={styles.texts}>
            <Text style={styles.tipo}>Guardião</Text>
            <Text style={styles.desc}>
              Veja trajetos em tempo real e receba alertas
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.button}>
        <Pressable
          style={[styles.btnPurple, !perfil && { opacity: 0.5 }]}
          disabled={!perfil}
          onPress={() => {
            if (perfil === "guardiao") {
              navigation.navigate("CadastroGuardiao1");
            } else {
              navigation.navigate("Passo2", {
                perfilSelecionado: perfil,
              });
            }
          }}
        >
          <Text style={styles.txWhite}>Continuar</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
