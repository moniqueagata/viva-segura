import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, Animated, Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef, useEffect } from 'react';
import styles from'./styles/stylesGuardiao1';

export default function CadastroGuardiao1() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [codUsu, setCodUsu] = useState('');

    // Validação
    const formularioValido =
      nome.trim().length > 3 &&
      telefone.length >= 14 &&
      email.includes('@') && email.includes('.');

    // Barra de progresso
    const [width, setWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const [reactiveValue, setReactiveValue] = useState(-1000);
    const step = 2;
    const steps = 4;

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
  <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Passo1')}>
          <Image source={require('../../../assets/imgGuardiao/arrow_2.png')} 
            style={{ width: 20, height: 20 }}
            tintColor='#ccc'
            resizeMode='contain' 
          />
        </Pressable>
        <View style={styles.barra}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <Animated.View
            style={[
              styles.barraPurple, { transform:[{ translateX: animatedValue }]}
            ]}
          />
        </View>
      </View>

        <View style={styles.logo}>
          <Image source={require('../../../assets/imgGuardiao/logo.png')} 
            style={{ width: 130, height: 130 }} 
            resizeMode='contain'
          />
        </View>

        <Text style={styles.subtitulo}>
          Preencha as informações que estão abaixo
        </Text>

        <View style={styles.inputsContainer}>
          <PaperInput
            label={<Text style={{ fontSize: 15, letterSpacing: 0.4 }}>Nome</Text>}
            mode='outlined'
            style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
            outlineColor='#ddd'        
            activeOutlineColor='#3fc8b3' 
            outlineStyle={{ borderRadius: 15 }}
            theme={{ colors: { primary: '#3fc8b3', onSurfaceVariant: '#ccc' } }} 
            value={nome}
            onChangeText={setNome}
            autoCapitalize='words'
            maxLength={80}
          />

          <PaperInput
            label={<Text style={{ fontSize: 15, letterSpacing: 0.4 }}>Telefone</Text>}
            mode='outlined'
            style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
            left={<PaperInput.Affix text="+55" />}
            outlineColor='#ddd'        
            activeOutlineColor='#3fc8b3' 
            outlineStyle={{ borderRadius: 15 }}
            theme={{ colors: { primary: '#3fc8b3', onSurfaceVariant: '#ccc' } }} 
            value={telefone}
            onChangeText={setTelefone}
            keyboardType='phone-pad'
            render={props => ( <TextInputMask {...props} type={'cel-phone'} options={{maskType: 'BRL', withDDD: true, dddMask: '(11) '}} />)}
          />

          <PaperInput
            label={<Text style={{ fontSize: 15, letterSpacing: 0.4 }}>E-mail</Text>}
            mode='outlined'
            style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
            outlineColor='#ddd'        
            activeOutlineColor='#3fc8b3' 
            outlineStyle={{ borderRadius: 15 }}
            theme={{ colors: { primary: '#3fc8b3', onSurfaceVariant: '#ccc' } }} 
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            maxLength={100}
          />  
           <PaperInput
            label={<Text style={{ fontSize: 15, letterSpacing: 0.4 }}>Codigo Usuária</Text>}
            mode='outlined'
            style={{ backgroundColor: '#fff', height: 50, width: '95%' }}
            outlineColor='#ddd'        
            activeOutlineColor='#3fc8b3' 
            outlineStyle={{ borderRadius: 15 }}
            theme={{ colors: { primary: '#3fc8b3', onSurfaceVariant: '#ccc' } }} 
            value={codUsu}
            onChangeText={setCodUsu}
            keyboardType='number'
            autoCapitalize='none'
            maxLength={100}
          />               
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.btnPurple, !formularioValido && {opacity: 0.5}]}
            onPress={() => { 
              navigation.navigate('CadastroGuardiao2', {nome, telefone, email, codUsu});
          }}>
            <Text style={styles.txWhite}>Continuar</Text>
          </Pressable>
        </View>
        
            <StatusBar style="auto" />
    </ScrollView>
  </KeyboardAvoidingView>
  );
}