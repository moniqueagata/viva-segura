import { StatusBar } from "expo-status-bar";
import { View, Text, FlatList, Image, Pressable, Linking, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BottomNavGuardiao from "../../components/BottomNavGuardiao";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CentralEmergencia() {
  const navigation = useNavigation();

  const ligarEmergencia = async (item) => {
    try {
      Alert.alert(
        "Emergência",
        `Deseja ligar para a emergência agora?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Ligar",
            onPress: async () => {
              await Linking.openURL("tel:190");
            },
          },
        ]
      );
    } catch (error) {
      console.log("Erro ao ligar emergência:", error);
    }
  };

  const [alertas, setAlertas] = useState([]);
  const buscarAlertas = async () => {
    try {
      const response = await api.get("/botao-panico-ativos");
      const agrupados = {};
      response.data.forEach((alerta) => {
        if (!agrupados[alerta.id_usuaria]) {
          agrupados[alerta.id_usuaria] = {
            ...alerta,
            quantidadeAlertas: 1,
          };
        } else {
          agrupados[alerta.id_usuaria].quantidadeAlertas++;
        }
      });
      setAlertas(Object.values(agrupados));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarAlertas();
    const interval = setInterval(() => {
      buscarAlertas();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.fotoBox}>
          <Image
            source={
              item.foto
                ? { uri: item.foto }
                : require("../../../assets/img/icon2.png")
            }
            style={styles.foto}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.status}>🚨 EMERGÊNCIA ATIVA </Text>
        </View>
      </View>
      <Text style={styles.info}>{item.quantidadeAlertas} acionamentos SOS</Text>
      <Text style={styles.info}>Último alerta: {item.dataHoraAlerta}</Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.btnSecundario}
          onPress={() => navigation.navigate("AcompanharRota", { usuaria: item })}
        >
          <Text style={styles.btnTextSec}>Acompanhar rota</Text>
        </Pressable>
        <Pressable
          style={[styles.btnPrincipal, { backgroundColor: "#d32a27" }]}
          onPress={() => ligarEmergencia(item)}
        >
          <Text style={styles.btnText}>Acionar SOS</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Central de Emergência</Text>
      <Text style={styles.subtitle}>Veja aqui os alertas recebidos em tempo real!</Text>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id_alerta.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
      <BottomNavGuardiao abaAtivaInicial={2} />
    </SafeAreaView>
  );
}