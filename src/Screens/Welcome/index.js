import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../../assets/img/logo.png')} 
            style={{ width: 77, height: 77 }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.content}>
          <View style={styles.txIcon}>
            <View style={styles.imagem}>
              <Image source={require('../../../assets/img/welcome.png')}
                style={{ width: 266, height: 266 }}
              />
            </View>
            <View style={styles.texts}>
              <Text style={styles.titulo}>Bem-vinda(o)</Text>
              <Text style={styles.descricao}>Acompanhe trajetos, compartilhe localização e peça ajuda com um toque</Text>
            </View>
          </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.btnPurple} onPress={() => navigation.navigate('Passo1')}>
            <Text style={styles.txWhite}>Criar conta</Text>
          </Pressable>
          <View style={styles.linkView}>
            <Text style={styles.txLink}>Já possui conta?</Text><Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Entrar</Text></Pressable>
          </View>
        </View>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}