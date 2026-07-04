import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function NotificacoesGuardiao() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.buttonHeader} onPress={() => navigation.navigate('PerfilGuardiao')}>
          <Image 
            source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 20, height: 20 }} 
            tintColor='#6925b8'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Notificações</Text> 
      </View>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/img/sino.png')} 
          style={styles.sinoIcone}
        />
        <Text style={styles.textoVazio}>Não há notificações disponíveis</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}