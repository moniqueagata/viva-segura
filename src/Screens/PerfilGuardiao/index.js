import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import BottomNavGuardiao from "../../components/BottomNavGuardiao";

export default function PerfilGuardiao() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

  // CARREGAR DADOS DO STORAGE
  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("user");

      if (dados) {
        setUsuario(JSON.parse(dados));
      }
    };
    carregarUsuario();
  }, []);

  // Logout -> Sair da conta
    const fazerLogout = async () => {
        await AsyncStorage.removeItem("user");

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TÍTULO */}
        <Text style={styles.headerTitle}>Meu Perfil</Text>

        {/* FOTO */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={
                usuario?.foto
                  ? { uri: usuario.foto }
                  : require("../../../assets/imgHomeGuardiao/meuPerfil.png")
              }
              style={styles.avatarImage}
            />
          </View>

          <Pressable style={styles.cameraButton}>
            <Image
              source={require("../../../assets/img/settings.png")}
              style={styles.cameraIcon}
              tintColor="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* NOME */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {usuario?.nome || "Nome do Guardião"}
          </Text>

          <Text style={styles.userStatus}>Pessoas protegidas</Text>
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem} 
          onPress={() => navigation.navigate("EditarPerfilGuardiao")}
          >
            <View style={styles.menuItemLeft}>
              <Image
                source={require("../../../assets/img/settings.png")}
                style={styles.menuIcon}
                tintColor="#6AD1B2"
              />
              <Text style={styles.menuItemText}>Editar perfil</Text>
            </View>

            <Image
                source={require("../../../assets/img/arrow_2.png")}
                style={styles.arrowIcon}
                tintColor="#4B0082"
            />
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate("NotificacoesGuardiao")}
          >
            <View style={styles.menuItemLeft}>
              <Image
                source={require("../../../assets/img/sino.png")}
                style={styles.menuIcon}
                tintColor="#6AD1B2"
              />
              <Text style={styles.menuItemText}>Notificações</Text>
            </View>

            <Image
                source={require("../../../assets/img/arrow_2.png")}
                style={styles.arrowIcon}
                tintColor="#4B0082"
            />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require("../../../assets/img/password.png")}
                style={styles.menuIcon}
                tintColor="#6AD1B2"
              />
              <Text style={styles.menuItemText}>Alterar senha</Text>
            </View>

            <Image
                source={require("../../../assets/img/arrow_2.png")}
                style={styles.arrowIcon}
                tintColor="#4B0082"
            />
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate("CentralGuardiao")}
          >
            <View style={styles.menuItemLeft}>
              <Image
                source={require("../../../assets/img/helpcenter.png")}
                style={styles.menuIcon}
                tintColor="#6AD1B2"
              />
              <Text style={styles.menuItemText}>Central de ajuda</Text>
            </View>

            <Image
                source={require("../../../assets/img/arrow_2.png")}
                style={styles.arrowIcon}
                tintColor="#4B0082"
            />
          </Pressable>
        </View>

        {/* EXCLUIR */}
        <Pressable style={styles.deleteButton} onPress={fazerLogout}>
          <Text style={styles.deleteButtonText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>

      <BottomNavGuardiao abaAtivaInicial={3} />
    </SafeAreaView>
  );
}