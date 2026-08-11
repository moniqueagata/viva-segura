<div align="center">
  <img src="screenshots/logo.png" alt="Logo Viva Segura" width="100%"/>
</div>

<br>

**Viva Segura** é um aplicativo desenvolvido como Trabalho de Conclusão de Curso do curso Técnico de Desenvolvimento de Sistemas na **ETEC de Guaianazes**. O objetivo do app é oferecer segurança e proteção às mulheres durante seus deslocamentos diários.

## 💡 Sobre o projeto

Com o aumento de casos de feminicídio no Brasil, muitas mulheres se sentem **inseguras** ao se deslocarem desacompanhadas durante o cotidiano. 

O **Viva Segura** nasce para reduzir essa insegurança, permitindo que a usuária compartilhe sua localização, converse e acione ajuda de forma rápida.

O aplicativo conta com dois perfis de acesso:

- 👩 **Usuária** — perfil destinado as mulheres, que utiliza os principais recursos do app.
- 😇 **Guardião** — contato de confiança escolhida pela usuária que acompanha seus deslocamentos e é acionado(a) em casos de emergência.

### Principais funcionalidades

- 🔐 **Autenticação e escolha de perfil** — ao entrar no app, o usuário define se é Usuária ou Guardião.
- 📍 **Compartilhamento de trajeto** — a Usuária compartilha seu trajeto em tempo real com o Guardião escolhido.
- 💬 **Chat** — comunicação direta entre Usuária e Guardião.
- 🚨 **Botão de SOS** — em situações de emergência, envia um alerta imediato ao Guardião.
- 📌 **Endereços de confiança** — a Usuária pode cadastrar endereços confiaveis (casa, trabalho, etc.).
- 📰 **Mural de notícias** — conteúdo informativo voltado ao público feminino.

<div align="center">

### 💻 Tecnologias utilizadas

![Expo](https://img.shields.io/badge/-Expo-0D1117?style=for-the-badge&logo=expo&logoColor=f0f0f0&labelColor=0D1117)&nbsp;
![React Native](https://img.shields.io/badge/-React_Native-0D1117?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0D1117)&nbsp;
![JavaScript](https://img.shields.io/badge/-JavaScript-0D1117?style=for-the-badge&logo=javascript&logoColor=ffe240&labelColor=0D1117)&nbsp;
![Laravel](https://img.shields.io/badge/-Laravel-0D1117?style=for-the-badge&logo=laravel&logoColor=e63124&labelColor=0D1117)&nbsp;
![MySQL](https://img.shields.io/badge/-MySQL-0D1117?style=for-the-badge&logo=mysql&logoColor=7bafd6&labelColor=0D1117)&nbsp;
![Git](https://img.shields.io/badge/-Git-0D1117?style=for-the-badge&logo=git&logoColor=fc8b2e&labelColor=0D1117)&nbsp;

<a url="https://project-osrm.org/">

  ![Project OSRM](https://img.shields.io/badge/API_Project_OSRM-0D1117?style=for-the-badge&logoColor=7bafd6&labelColor=0D1117)&nbsp;
</a>

</div>

## 📱 Prints do aplicativo

<h3 align="center">Usuária</h3>
<table align="center">
  <tr>
    <td align="center">Home</td>
    <td align="center">Mural de notícias</td>
    <td align="center">Mapa</td>
  </tr>
  <tr>
    <td><img src="screenshots/home_usuaria.png" width="220"/></td>
    <td><img src="screenshots/mural.png" width="220"/></td>
    <td><img src="screenshots/mapa.png" width="220"/></td>
  </tr>
</table>

<h3 align="center">Guardião</h3>
<table align="center">
  <tr>
    <td align="center">Home</td>
    <td align="center">Acompanhar rota</td>
    <td align="center">Central de Alertas (SOS)</td>
  </tr>
  <tr>
    <td><img src="screenshots/home_guardiao.png" width="220"/></td>
    <td><img src="screenshots/rota.png" width="220"/></td>
    <td><img src="screenshots/alerta.png" width="220"/></td>
  </tr>
</table>


## 📂 Estrutura do projeto

```
app-viva-segura/
├── assets/          # Imagens e ícones
├── screenshots/     # Prints
├── src/
│   ├── components/  # Componentes reutilizáveis da interface
│   ├── Screens/     # Telas do aplicativo
│   └── services/
│       └── api.js   # Configuração do IP e conexão com o banco
└── App.js           # Ponto de entrada da aplicação
```

## Como executar o projeto?

> ⚠️ **Importante:** o back-end precisa estar rodando **ANTES** de iniciar a aplicação, pois ela depende da API para autenticação e persistência de dados.

### 1. Rodando o back-end

O back-end está em um repositório separado, que utiliza o **XAMPP** para o banco de dados **MySQL** - 🔗 **[app-viva-segura-backend](https://github.com/Kaawanny/app-viva-segura-backend)**

**Pré-requisitos:**

- [PHP](https://www.php.net/) e [Composer](https://getcomposer.org/) instalados
- [XAMPP](https://www.apachefriends.org/) instalado

**Passo a passo:**

```bash
# Clone o repositório
git clone https://github.com/Kaawanny/app-viva-segura-backend.git
cd app-viva-segura-backend

# Instale as dependências
composer install

# Rode o XAMPP (inicie o módulo MySQL pelo painel do XAMPP)

# Rode as migrations
php artisan migrate

# Popule o banco com as Seeders
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=LocalSeguroSeeder

# Suba o servidor expondo na rede local
php artisan serve --host=0.0.0.0 --port=8000
```

> O `--host=0.0.0.0` é necessário para que o celular (rodando via **Expo Go**) consiga acessar a API pela rede local, e não só o `localhost` do computador.

### 2. Rodando o aplicativo

**Pré-requisitos:**

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- [Expo Go](https://expo.dev/go) instalado no celular (Android/iOS) ou um emulador configurado

**Passo a passo:**

```bash
# Clone o repositório
git clone https://github.com/aghelloworld/app-viva-segura.git

# Acesse a pasta do projeto
cd app-viva-segura

# Instale as dependências
npm install
```
 
> ⚠️ Antes de iniciar o app, altere o IP configurado no `api.js` que se encontra na pasta `services` dentro do projeto, para o **IP local do seu computador**.

<div align="center">
  
  Celular e computador precisam estar configurados na **mesma rede Wi-Fi**.

  <img src="screenshots/local_api.png">

</div>
<br>

Para descobrir o IP local do seu computador é necessário abrir um novo terminal.

```bash
# Abra um novo terminal e execute
ipconfig
```
<div align="center">

  Procure por **"Endereço IPv4"** e copie a numeração do IP local.

  <img src="screenshots/endereco_ip.png">
  <br><br>

  Depois de copiar o IP, cole na *url* que está no `api.js`.

  <img src="screenshots/url_api.png">
</div>
<br>

Em seguida execute o comando abaixo para iniciar o app, e escanei o **QR Code** exibido no terminal com o *Expo Go* instalado em seu celular.

```bash
# inicie o aplicativo
npx expo start
```

### ✨ Tudo pronto!

O **Viva Segura** está pronto para ser executado.
Agora você pode acessar o app pelo *Expo Go* e explorar suas funcionalidades na prática.

#

<div align="center">

Projeto dedicado a todas as mulheres que lutam por uma vida mais segura e livre da violência.

### Viva Segura - Livre para Ser. Segura para Viver. 💜

</div>