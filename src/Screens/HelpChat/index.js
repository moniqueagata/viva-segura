import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, Pressable, TextInput, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useState } from 'react';

  // Formatação de data e hora do chat
  const hora = (data) => {
    return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const dataTop = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };
  // -----

export default function HelpChat() {
    const navigation = useNavigation();
    const [focus, setFocus] = useState(false);

    // Mensagens do chat
    const [mensagens, setMensagens] = useState([
      { id: 1, text: 'Olá! Como podemos ajudar?', side: 'left', createdAt: new Date() } // Mensagem inicial do suporte
    ]);
    const [text, setText] = useState('');

    // Enviar mensagem
    const enviar = () => {
      if (text.trim().length > 0){
        const novaMensagem = {
          id: Date.now(),
          text: text,
          side: 'right',
          createdAt: new Date()
        };
        setMensagens([...mensagens, novaMensagem]);
        setText('');
      }
    };
    // ----

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['right', 'left']}>
        <KeyboardAvoidingView 
          style={{  flex: 1, backgroundColor:'#fff' }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable style={styles.buttonArrow} onPress={() => navigation.navigate('Central')}>
                <Image source={require('../../../assets/img/arrow_2.png')} 
                  style={{ width: 18, height: 18 }} 
                  tintColor='#6925b8'
                />
              </Pressable>
              <Text style={styles.tituloHeader}>Suporte</Text>
            </View>

            <FlatList data={[...mensagens].reverse()}
              keyExtractor={(item) => item.id.toString()}
              inverted={true}
              style={styles.scroll}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}

              ListFooterComponent={() => (
                <View style={styles.coontainerData}>
                  <Text style={styles.data}>{dataTop(mensagens[0].createdAt)}</Text>
                </View>
              )}

              renderItem={({ item }) => (
                <View style={[ styles.containerMensagem, { alignSelf: item.side === 'right' ? 'flex-end' : 'flex-start' } ]}>
                  <View style={[ styles.balao, item.side === 'right' ? styles.balaoD : styles.balaoE ]}>
                    <Text style={item.side === 'right' ? styles.textWhite : styles.textBlack}>
                      {item.text}
                    </Text>
                  </View>
                  <Text style={[styles.horario, item.side === 'right' ? { textAlign: 'right' } : { textAlign: 'left' }]}>
                    {hora(item.createdAt)}
                  </Text>
                </View>
              )}
            />

            <View style={styles.inputBar}>
              <TextInput 
                style={styles.input}
                placeholder='Escreva sua mensagem'
                placeholderTextColor= '#999'
                value={text}
                onChangeText={setText}
              />
              <Pressable style={styles.send} onPress={enviar}>
                <Image source={require('../../../assets/img/send.png')} 
                  style={{ width: 18, height: 18 }}
                  tintColor='#fff'
                />
              </Pressable>
            </View>
            <StatusBar style="auto" />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}