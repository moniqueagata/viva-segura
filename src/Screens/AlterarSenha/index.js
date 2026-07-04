import { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import api from '../../services/api'; 

const REQUISITOS = [
  { id: 'caracteres', label: 'Mínimo de 8 caracteres', check: (v) => v.length >= 8 },
  { id: 'numeros', label: 'Números',  check: (v) => /[0-9]/.test(v) },
  { id: 'caixas', label: 'Letras maiúsculas e minúsculas',  check: (v) => /[A-Z]/.test(v) && /[a-z]/.test(v) },
  { id: 'especial', label: 'Caracteres especiais', check: (v) => /[^A-Za-z0-9]/.test(v) },
];

export default function AlterarSenha() {
  const navigation = useNavigation();

  const [senhaAtual,      setSenhaAtual]      = useState('');
  const [senhaNova,       setSenhaNova]       = useState('');
  const [confirmaSenha,   setConfirmaSenha]   = useState('');
  const [mostrarAtual,    setMostrarAtual]    = useState(false);
  const [mostrarNova,     setMostrarNova]     = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);

  const requisitos  = REQUISITOS.map(r => ({ ...r, ok: r.check(senhaNova) }));
  const todosOk     = requisitos.every(r => r.ok);
  const senhaValida = todosOk && senhaNova !== senhaAtual && senhaNova === confirmaSenha && senhaNova !== '';

  async function salvarSenha() {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('user');

      console.log('USUARIO STORAGE BRUTO:', usuarioSalvo);

      if (!usuarioSalvo) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      const usuario = JSON.parse(usuarioSalvo);

      console.log('USUARIO PARSEADO:', usuario);
      console.log('ID USUARIA:', usuario?.id_usuaria);

      if (!usuario?.id_usuaria) {
        Alert.alert('Erro', 'Dados do usuário inválidos.');
        return;
      }

      const payload = {
        senha_atual: senhaAtual,
        senha_nova: senhaNova,
        senha_nova_confirmation: confirmaSenha,
      };

      console.log('URL:', `/usuaria/${usuario.id_usuaria}/senha`);
      console.log('PAYLOAD:', payload);

      const response = await api.put(
        `/usuaria/${usuario.id_usuaria}/senha`,
        payload
      );

      console.log('RESPOSTA API:', response.data);

      Alert.alert('Sucesso', 'Senha atualizada com sucesso.');

      navigation.navigate('Perfil');

    } catch (error) {
      console.log('=== ERRO ALTERAR SENHA ===');
      console.log('ERROR:', error);
      console.log('MESSAGE:', error?.message);
      console.log('CODE:', error?.code);
      console.log('STATUS:', error?.response?.status);
      console.log('DATA:', error?.response?.data);

      Alert.alert(
        'Erro',
        error?.response?.data?.message ||
        error?.response?.data?.erro ||
        error?.message ||
        'Não foi possível atualizar a senha.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Perfil')}>
          <Image source={require('../../../assets/img/arrow_2.png')} 
            style={{ width: 18, height: 18 }} 
            tintColor='#6925b8'
          />
        </Pressable>
        <Text style={styles.tituloHeader}>Alterar senha</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.dica}>
            <Feather name="shield" size={23} color="#6925b8" style={{ marginRight: 14 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.dicaTitulo}>Dica de segurança</Text>
              <Text style={styles.dicaTexto}>Evite usar informações pessoais como datas{'\n'}de nascimento, nomes ou sequências simples.</Text>
            </View>
          </View>
          <View style={{ width: '100%', marginVertical: '5%' }}>
            <Text style={styles.sectionLabel}>Senha atual</Text>
            <View style={styles.campo}>
              <Feather name="lock" size={20} color="#ddd" />
              <TextInput
                style={styles.campoInput}
                placeholder="Digite sua senha atual"
                placeholderTextColor="#ccc"
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry={!mostrarAtual}
                maxLength={80}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setMostrarAtual(v => !v)}>
                <Feather name={mostrarAtual ?  'eye' : 'eye-off'} size={20} color="#6925b8" />
              </Pressable>
            </View>
            <Text style={styles.sectionLabel}>Nova senha</Text>
            <View style={styles.campo}>
              <Feather name="lock" size={20} color="#ddd" />
              <TextInput
                style={styles.campoInput}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#ccc"
                value={senhaNova}
                onChangeText={setSenhaNova}
                secureTextEntry={!mostrarNova}
                maxLength={80}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setMostrarNova(v => !v)}>
                <Feather name={mostrarNova ?  'eye' : 'eye-off'} size={20} color="#6925b8" />
              </Pressable>
            </View>
            <Text style={styles.sectionLabel}>Confirmar nova senha</Text>
            <View style={styles.campo}>
              <Feather name="lock" size={20} color="#ddd" />
              <TextInput
                style={styles.campoInput}
                placeholder="Digite sua nova senha novamente"
                placeholderTextColor="#ccc"
                value={confirmaSenha}
                onChangeText={setConfirmaSenha}
                secureTextEntry={!mostrarConfirma}
                maxLength={80}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setMostrarConfirma(v => !v)}>
                <Feather name={mostrarConfirma ?  'eye' : 'eye-off'} size={20} color="#6925b8" />
              </Pressable>
            </View>
          </View>
          <View style={{ width: '100%', paddingLeft: 8 }}>
            <Text style={styles.requisitosLabel}>Sua senha deve conter:</Text>
            <View style={styles.requisitosGrid}>
              {requisitos.map(r => (
                <View key={r.id} style={styles.requisito}>
                  <View style={[styles.circulo, r.ok && styles.circuloOk]}>
                    {r.ok && <Feather name="check" size={11} color="#fff" />}
                  </View>
                  <Text style={styles.requisitoTexto}>{r.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <Pressable style={[styles.button, { backgroundColor: 'transparent' }]} onPress={() => navigation.navigate('Perfil')}>
              <Text style={styles.btnCancelar}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { width: 180 }, !senhaValida && styles.btnSalvarDisabled]}
              disabled={!senhaValida}
              onPress={salvarSenha}
            >
              <Text style={styles.btnSalvarTexto}>Salvar senha</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}