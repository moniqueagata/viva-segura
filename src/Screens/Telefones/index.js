import React from "react";
import { View, Text, Pressable ,Image, Linking} from "react-native";
import styles from'./styles';
import { useNavigation } from '@react-navigation/native';
import SOSButton from "../../components/SOSButton";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Telefones() {
  const navigation = useNavigation();

  // Ligar para emergência
  const ligar = (numero) => {
    Linking.openURL(`tel:${numero}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/img/arrow_2.png')} style={{width: 20, height: 20, tintColor: "#fff"}} />
        </Pressable>
        <Text style={styles.titulo}>Telefones públicos</Text>
      </View>
      <View style={styles.content}>
        <Pressable style={styles.card}>
          <Text style={styles.tituloCard}>Central de Atendimento à Mulher</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image
              source={require('../../../assets/img/phone_outline.png')} 
              style={{width: 16, height: 16, tintColor: "#999"}}
            />
            <Text style={styles.numero} onPress={() => Linking.openURL('tel:180')}>180</Text>
          </View>
        </Pressable>
        <Pressable style={styles.card}>
          <Text style={styles.tituloCard}>Polícia Civil</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image
                source={require('../../../assets/img/phone_outline.png')} 
                style={{width: 16, height: 16, tintColor: "#999"}}
              />
              <Text style={styles.numero} onPress={() => Linking.openURL('tel:197')}>197</Text>
            </View>
        </Pressable>
        <Pressable style={styles.card}>
          <Text style={styles.tituloCard}>Polícia Militar</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image
              source={require('../../../assets/img/phone_outline.png')} 
              style={{width: 16, height: 16, tintColor: "#999"}}
            />
            <Text onPress={() => Linking.openURL('tel:190')} style={styles.numero}>190</Text>
          </View>
        </Pressable>
        <Pressable style={styles.card}>
          <Text style={styles.tituloCard}>Delegacia da Mulher</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesome name="whatsapp" size={20} color="#999" />
            <Text style={styles.numero}  onPress={() => ligar('61996109180')}>(61) 99610-0180</Text>
          </View>
        </Pressable>
        {/* Botão de SOS */}
          <SOSButton />
      </View>
    </View>
  );
}