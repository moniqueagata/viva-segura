<div align="center">
  <img src="screenshots/logo.png" alt="Logo Viva Segura" width="100%"/>
</div>

<br>

# ♀️ Viva Segura

A **Viva Segura** é um aplicativo mobile voltado à **segurança feminina**, desenvolvido como Trabalho de Conclusão de Curso (TCC) no curso Técnico de Desenvolvimento de Sistemas. O objetivo do app é oferecer mais Segurança e proteção às mulheres durante seus deslocamentos diários, conectando-as a pessoas de confiança em tempo real.

## Sobre o projeto

Muitas mulheres enfrentam insegurança ao se deslocarem sozinhas, seja a pé, de transporte público ou por aplicativo. O Viva Segura nasce para reduzir essa insegurança, permitindo que a usuária compartilhe sua localização, converse e acione ajuda de forma rápida com uma pessoa de sua confiança, o **Guardião**.

O app trabalha com dois perfis (personas):

- 👩 **Usuária (Protegida)** — pessoa que utiliza os recursos de proteção durante seus trajetos.
- 😇 **Guardião** — pessoa de confiança escolhida pela usuária que acompanha seus deslocamentos e é acionada em casos de emergência.

## ✨ Principais funcionalidades

- 🔐 **Autenticação e escolha de persona** — ao entrar no app, o usuário define se é Usuária ou Guardião.
- 📍 **Compartilhamento de rota** — a Usuária compartilha seu trajeto em tempo real com o Guardião escolhido.
- 💬 **Chat** — comunicação direta entre Usuária e Guardião.
- 🆘 **Botão de SOS** — em situações de emergência, envia um alerta imediato ao Guardião.
- 📌 **Endereços de confiança** — a Usuária pode cadastrar endereços confiaveis (casa, trabalho, etc.).
- 📰 **Mural de notícias** — conteúdo informativo voltado ao público feminino.
<br>
<h3 align="center">🚀 Tecnologias utilizadas</h3>

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![XAMPP](https://img.shields.io/badge/XAMPP-df5f16?style=for-the-badge&logo=xampp&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [OSRM (Open Source Routing Machine)](http://project-osrm.org/)
- [Laravel](https://laravel.com/) — Backend do app → ([Viva Segura - backend](https://github.com/Kaawanny/app-viva-segura-backend))

## 📱 Telas do App

<h3 align="center">👩 Usuária (Protegida)</h3>
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

<h3 align="center">😇 Guardião</h3>
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
├── screenshots/     # Prints do app 
├── src/
│   ├── components/  # Componentes reutilizáveis da interface
│   ├── Screens/     # Telas do aplicativo
│   └── services/
│       └── api.js   # Configuração da conexão com o backend (IP)
└── App.js           # Ponto de entrada da aplicação
```

## Como executar o projeto

> ⚠️ **Importante:** o backend precisa estar rodando **antes** de iniciar o app, pois o frontend depende da API para autenticação e persistência de dados.

### 1. Rodando o backend

O backend está em um repositório separado, feito em Laravel, e utiliza o **XAMPP** para o banco de dados MySQL.

🔗 **[app-viva-segura-backend](https://github.com/Kaawanny/app-viva-segura-backend)**

**Pré-requisitos:**

- [PHP](https://www.php.net/) e [Composer](https://getcomposer.org/) instalados
- [XAMPP](https://www.apachefriends.org/) instalado (para o MySQL)

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

# Popule o banco com os seeders
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=LocalSeguroSeeder

# Suba o servidor expondo na rede local
php artisan serve --host=0.0.0.0 --port=8000
```

> O `--host=0.0.0.0` é necessário para que o celular (rodando o app via Expo Go) consiga acessar a API pela rede local, e não só o `localhost` do computador.

### 2. Rodando o app mobile

**Pré-requisitos:**

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- App **Expo Go** instalado no celular (Android/iOS) ou um emulador configurado

**Passo a passo:**

```bash
# Clone o repositório
git clone https://github.com/moniqueagata/app-viva-segura.git

# Acesse a pasta do projeto
cd app-viva-segura

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```
 
> ⚠️ Antes de rodar, altere o IP configurado no `api.js` do app para o **IP local do seu computador** (o mesmo que está rodando o backend). Celular e computador precisam estar na mesma rede Wi-Fi.

```bash
# Abra um novo terminal e execute
ipconfig
```
- Procure por **"Endereço IPv4"** copie o IP e cole na URL do `api.js`.

Após rodar o comando, escaneie o QR Code exibido no terminal com o app **Expo Go** para visualizar o aplicativo no seu celular.

## 👩🏻‍💻 Autores

Projeto desenvolvido como Trabalho de Conclusão de Curso, pelos integrantes:

- *[Alice Oliveira](https://github.com/alicejeoliveira-eng)*
- *[Beatriz Maurício](https://github.com/biaa15042008)*
- *Júlio César*
- *[Kawanny Avanci](https://github.com/Kaawanny)*
- *[Monique Agata](https://github.com/moniqueagata)*
- *[Larissa Araújo](https://github.com/LarissaaraujoM)*
- *[Luccas Gustavo](https://github.com/LuccasDrewj)*
- *[Samira Sampaio](https://github.com/samppSamis)*

## 📄 Licença

Este projeto é de caráter acadêmico desenvolvido para fins de TCC, realizado em *2026* na instituição **Etec de Guaianases**.
