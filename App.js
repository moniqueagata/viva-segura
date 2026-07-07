import 'react-native-gesture-handler';
import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component', 'expo-notifications: Android Push notifications', '`expo-notifications` functionality is not fully supported in Expo Go']);

// Telas - Usuária
import Splash from "./src/Screens/Splash";
import Welcome from "./src/Screens/Welcome";
import Login from "./src/Screens/Login";
import Passo1 from "./src/Screens/Cadastro/Passo1";
import Passo2 from "./src/Screens/Cadastro/Passo2";
import Passo3 from "./src/Screens/Cadastro/Passo3";
import Passo4 from './src/Screens/Cadastro/Passo4';
import Passo5 from './src/Screens/Cadastro/Passo5';
import Home from "./src/Screens/Home";
import Telefones from "./src/Screens/Telefones";
import EnderecoUsuaria from './src/Screens/EnderecoUsuaria';
import Mapa from "./src/Screens/Mapa";
import Mural from "./src/Screens/Mural";
import Perfil from "./src/Screens/Perfil";
import EditarPerfil from "./src/Screens/EditarPerfil";
import AlterarSenha from './src/Screens/AlterarSenha';
import Notificacoes from "./src/Screens/Notificacoes";
import Central from "./src/Screens/Central";
import HelpChat from "./src/Screens/HelpChat";
import TermosPrivacidade from './src/Screens/TermosPrivacidade';
import MeusGuardioes from "./src/Screens/MeusGuardioes";
import AddGuardiao from "./src/Screens/MeusGuardioes/AddGuardiao";

// Telas - Guardião 
import CadastroGuardiao1 from "./src/Screens/CadastroGuardiao/CadastroGuardiao1";
import CadastroGuardiao2 from "./src/Screens/CadastroGuardiao/CadastroGuardiao2";
import CadastroGuardiao3 from "./src/Screens/CadastroGuardiao/CadastroGuardiao3";
import HomeGuardiao from "./src/Screens/HomeGuardiao";
import AcompanharRota from './src/Screens/HomeGuardiao/AcompanharRota';
import CentralEmergencia from "./src/Screens/CentralEmergencia";
import ChatGuardiao from './src/Screens/ChatGuardiao';
import Mensagens from './src/Screens/Mensagens';
import PerfilGuardiao from './src/Screens/PerfilGuardiao';
import NotificacoesGuardiao from './src/Screens/NotificacoesGuardiao';
import CentralAjuda from './src/Screens/CentralAjuda';
import CentralGuardiao from './src/Screens/CentralGuardiao';
import EditarPerfilGuardiao from './src/Screens/EditarPerfilGuardiao';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Welcome" component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Passo1" component={Passo1}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Passo2" component={Passo2}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Passo3" component={Passo3}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Passo4" component={Passo4}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Passo5" component={Passo5}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Login" component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Home" component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Telefones" component={Telefones}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="EnderecoUsuaria" component={EnderecoUsuaria}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Mapa" component={Mapa}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="MeusGuardioes" component={MeusGuardioes}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="AddGuardiao" component={AddGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Mural" component={Mural}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Perfil" component={Perfil}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Notificacoes" component={Notificacoes}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="AlterarSenha" component={AlterarSenha}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Central" component={Central}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="HelpChat" component={HelpChat}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="TermosPrivacidade" component={TermosPrivacidade}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CadastroGuardiao3" component={CadastroGuardiao3}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CadastroGuardiao2" component={CadastroGuardiao2}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CadastroGuardiao1" component={CadastroGuardiao1}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="HomeGuardiao" component={HomeGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="PerfilGuardiao" component={PerfilGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CentralAjuda" component={CentralAjuda}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CentralGuardiao" component={CentralGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="NotificacoesGuardiao" component={NotificacoesGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="CentralEmergencia" component={CentralEmergencia}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="EditarPerfilGuardiao" component={EditarPerfilGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="ChatGuardiao" component={ChatGuardiao}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="AcompanharRota" component={AcompanharRota}
            options={{
            headerShown: false
            }}
            />
          <Stack.Screen name="Mensagens" component={Mensagens}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

