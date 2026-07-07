import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useState } from 'react';

const FaqCard = ({ categoria, icone, perguntas }) => {
  const [perguntaAberta, setPerguntaAberta] = useState(null);
  const alternarPergunta = (index) => {
    setPerguntaAberta(perguntaAberta === index ? null : index);
  };

  return (
    <View style={styles.session}>
      <View style={styles.row}>
        <Image source={icone} style={{ width: 22, height: 22 }} tintColor='#4FD1C5'/>
        <Text style={styles.subtitulo}>{categoria}</Text>
      </View>
      
      <View style={styles.cardButtons}>
        {perguntas.map((p, index) => {
          const isOpen = perguntaAberta === index;
          return (
            <View key={index} style={[styles.perguntaContainer, isOpen && styles.perguntaContainerAberta]}>
                <Pressable style={styles.button} onPress={() => alternarPergunta(index)}>
                <Text style={styles.textFaq}>{p.titulo}</Text>
              </Pressable>
              {isOpen && (
                <View style={styles.respostaContainer}>
                  <Text style={styles.textResposta}>{p.resposta}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function CentralGuardiao() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState('');

  const listaFaq = [
    {
      categoria: 'Perguntas frequentes',
      icone: require('../../../assets/img/chat.png'), 
      perguntas: [
        { 
          titulo: 'Como vejo a localização de quem estou acompanhando?', 
          resposta: 'Para ver a localização, acesse o mapa na tela inicial do aplicativo e selecione o perfil do usuário desejado na barra inferior.' 
        },
        { 
          titulo: 'Quero editar o meu perfil. Como faço?', 
          resposta: 'Vá até a aba Perfil, clique no botão "Meus dados", faça as alterações necessárias e não se esqueça de clicar em Salvar.' 
        },
        { 
          titulo: 'Minhas mensagens não estão sendo enviadas, o que devo fazer?', 
          resposta: 'Verifique sua conexão com a internet. Caso persista, tente fechar o aplicativo e abrir novamente ou limpar o cache.' 
        },
        { 
          titulo: 'A minha localização está errada, o que devo fazer?', 
          resposta: 'Certifique-se de que o GPS do seu aparelho está ligado em modo de "Alta Precisão" e que o app tem permissão para acessar a localização sempre.' 
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('PerfilGuardiao')}>
          <Image 
            source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 24, height: 24 }} 
            tintColor='#5A189A'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Central de ajuda</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image source={require('../../../assets/img/chat.png')} style={styles.bigIconTop} tintColor='#4FD1C5' />
          <Text style={styles.tituloCall}>Como podemos ajudar?</Text>
          <View style={styles.searchInputContainer}>
            <Image source={require('../../../assets/img/lupa.png')} style={{ width: 20, height: 20, marginLeft: 15 }} tintColor='#bbb' />
            <TextInput style={styles.input} placeholder="Procurar na Central de ajuda" placeholderTextColor="#bbb" value={busca} onChangeText={setBusca} />
          </View>
          {listaFaq.map((item, idx) => (
            <FaqCard key={idx} categoria={item.categoria} icone={item.icone} perguntas={item.perguntas} />
          ))}
        </View>
        <View style={styles.footerChatContainer}>
          <Text style={styles.textFaleConosco}>Fale conosco</Text>
          <Image source={require('../../../assets/img/arrow_2.png')} style={{ width: 20, height: 20, transform: [{ rotate: '180deg' }] }} tintColor='#5A189A' />
          <Pressable style={styles.floatingChatBtn} onPress={() => navigation.navigate('CentralAjuda')}>
            <Image source={require('../../../assets/img/chat.png')} style={{ width: 28, height: 28 }} tintColor='#fff' />
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}