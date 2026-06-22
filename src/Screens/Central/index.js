import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useState } from 'react';

  const FaqCard = ({ categoria, icone, perguntas }) => {
    const [aberto, setAberto] = useState(null);

    const togglePergunta = (index) => {
      setAberto(aberto === index ? null : index);
    };

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={icone} style={{ width: 24, height: 24 }} tintColor='#6925b8'/>
          <Text style={styles.categoria}>{categoria}</Text>
        </View>
        <View style={styles.cardButtons}>
          {perguntas.map((p, index) => (
            <View key={index}>
              <Pressable style={styles.button} onPress={() => togglePergunta(index)}>
                <Text style={styles.textFaq}>• {p.titulo}</Text>
              </Pressable>
              {aberto === index && (
                <Text style={styles.textResposta}>{p.resposta}</Text>
              )}
              {index < perguntas.length - 1 && <View style={styles.linha} />}
            </View>
          ))}
        </View>
      </View>
    );
  };

export default function Central() {
    const navigation = useNavigation();
    const [duvida, setDuvida] = useState('');
    const [modalVisivel, setModalVisivel] = useState(false);

    const enviarDuvida = () => {
      if (!duvida.trim()) return;
      setModalVisivel(true);
      setDuvida('');
    };

    const listaFaq = [
      {
        categoria: 'Segurança',
        icone: require('../../../assets/img/protection.png'),
        perguntas: [
          { titulo: 'Quando devo usar o modo emergência?', resposta: 'Use o modo emergência sempre que sentir que está em perigo ou em uma situação de risco. Ao ativá-lo, seus guardiões serão notificados imediatamente com sua localização em tempo real.' },
          { titulo: 'O que acontece quando ativo o modo emergência?', resposta: 'Seus guardiões recebem uma notificação de alerta com sua localização em tempo real. O aplicativo continua monitorando sua posição até que o modo seja desativado por você.' },
          { titulo: 'Meus guardiões recebem minha localização o tempo todo?', resposta: 'Não. Seus guardiões só recebem sua localização quando você compartilha manualmente ou quando o modo emergência está ativado.' }
        ]
      },
      {
        categoria: 'Guardiões',
        icone: require('../../../assets/img/angel.png'),
        perguntas: [
          { titulo: 'Como adicionar um guardião?', resposta: 'Vá até a seção Guardiões no menu principal, toque em "Adicionar guardião" e insira o número de telefone ou e-mail da pessoa. Ela receberá um convite para aceitar.' },
          { titulo: 'Quantos guardiões posso ter?', resposta: 'Você pode ter até 5 guardiões cadastrados simultaneamente.' },
          { titulo: 'Posso remover um guardião?', resposta: 'Sim. Acesse a seção Guardiões, selecione o guardião que deseja remover e toque em "Remover guardião". A ação é imediata.' }
        ]
      },
      {
        categoria: 'Localização',
        icone: require('../../../assets/img/map.png'),
        perguntas: [
          { titulo: 'Como funciona o compartilhamento de localização?', resposta: 'Você pode compartilhar sua localização em tempo real com seus guardiões a qualquer momento, tocando no botão de compartilhamento na tela principal.' },
          { titulo: 'A localização funciona em segundo plano?', resposta: 'Sim. Quando o modo emergência está ativo, a localização continua sendo enviada mesmo com o aplicativo em segundo plano ou com a tela bloqueada.' }
        ]
      },
      {
        categoria: 'Conta',
        icone: require('../../../assets/img/profile.png'),
        perguntas: [
          { titulo: 'Esqueci minha senha. O que fazer?', resposta: 'Na tela de login, toque em "Esqueci minha senha". Você receberá um e-mail com as instruções para criar uma nova senha.' },
          { titulo: 'Como alterar meus dados?', resposta: 'Acesse a seção Perfil no menu principal e toque em "Editar perfil" para alterar suas informações pessoais.' },
          { titulo: 'Como excluir minha conta?', resposta: 'Acesse Perfil > Configurações > Excluir conta. Atenção: essa ação é irreversível e todos os seus dados serão removidos permanentemente.' }
        ]
      },
    ];

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcone}>✅</Text>
            <Text style={styles.modalTitulo}>Dúvida enviada!</Text>
            <Text style={styles.modalTexto}>
              Recebemos sua mensagem e entraremos em contato em breve.
            </Text>
            <Pressable style={styles.modalBotao} onPress={() => setModalVisivel(false)}>
              <Text style={styles.modalBotaoTexto}>Ok, entendi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 18, height: 18 }} 
            tintColor='#6925b8'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Central de Ajuda</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Precisa de ajuda?</Text>
          </View>
          <View style={styles.searchInput}>
            <Image source={require('../../../assets/img/lupa.png')}
              style={{ width: 18, height: 18 }}
              tintColor='#aaa'
            />
            <TextInput
              style={styles.input}
              placeholder='Procurar...'
              placeholderTextColor='#999'
              value={duvida}
              onChangeText={setDuvida}
              onSubmitEditing={enviarDuvida}
              returnKeyType='send'
            />
            <Pressable
              style={[styles.btnEnviar, { opacity: duvida.trim().length > 0 ? 1 : 0.3 }]}
              onPress={enviarDuvida}
            >
              <Image source={require('../../../assets/img/send.png')} style={{ width: 12, height: 12 }} tintColor="#fff" />
            </Pressable>
          </View>
          <View style={styles.session}>
            <Text style={styles.subtitulo}>Dúvidas frequentes</Text>

            {listaFaq.map((item, index) => (
              <FaqCard
                key={index}
                categoria={item.categoria}
                icone={item.icone}
                perguntas={item.perguntas}
              />
            ))}
          </View>
            {/* Botão falar com suporte logo abaixo do título */}
          <Pressable style={styles.chat} onPress={() => navigation.navigate('HelpChat')}>
            <Image source={require('../../../assets/img/chat.png')} 
              style={{ width: 23, height: 23 }}
              tintColor='#fff'
            />
            <Text style={styles.textChat}>Falar com suporte</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}