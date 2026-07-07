import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SOSButton from "../../components/SOSButton";
import styles from './styles';

const sessoes = [
  {
    id: 'sobre',
    title: 'Sobre o Viva Segura',
    description:
      'O Viva Segura é uma plataforma desenvolvida para apoiar a segurança e o bem-estar das mulheres, oferecendo recursos como compartilhamento de localização, contatos de confiança, chat de apoio e acionamento de emergência.',
    iconName: 'shield-checkmark-outline',
  },
  {
    id: 'localizacao',
    title: 'Uso da Localização',
    description:
      'A localização é utilizada para funcionalidades de proteção, acompanhamento por guardiões autorizados e recursos de emergência. O acesso pode ocorrer em segundo plano quando necessário para garantir o funcionamento desses recursos.',
    iconName: 'location-outline',
  },
  {
    id: 'chat',
    title: 'Chat e Comunicações',
    description:
      'O chat foi criado para facilitar a comunicação entre usuárias, guardiões e canais de apoio disponíveis na plataforma. Mantenha sempre o respeito e não compartilhe informações sensíveis.',
    iconName: 'chatbubble-ellipses-outline',
  },
  {
    id: 'privacidade',
    title: 'Privacidade dos Dados',
    description:
      'Os dados coletados são tratados de forma segura e utilizados apenas para as finalidades descritas em nossa Política de Privacidade e conforme a legislação vigente.',
    iconName: 'lock-closed-outline',
  },
  {
    id: 'direitos',
    title: 'Seus Direitos',
    description:
      'Você pode solicitar acesso, correção ou exclusão de seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD).',
    iconName: 'person-outline',
  },
];

export default function TermosPrivacidade({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 18, height: 18 }} 
            tintColor='#6925b8'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Termos e Privacidade</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitulo}>Consulte as informações sobre o uso do aplicativo,{'\n'}privacidade e proteção de dados.</Text>
          {sessoes.map((section) => (
            <View key={section.id} style={styles.card}>
            
              <View style={styles.iconWrapper}>
                <Ionicons name={section.iconName} size={26} color="#5B2D9E" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                <Text style={styles.cardDescription}>{section.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Botão SOS */}
      <SOSButton/>
    </View>
  );
}