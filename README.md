# Previsão do Tempo - Vue.js

## Sobre o Projeto

Esta é uma aplicação web de previsão do tempo desenvolvida com **Vue.js**, **Vuetify**, **Vue Router**, **Axios** e **TypeScript**. O site permite buscar a previsão do tempo de uma cidade informada ou utilizar a localização do dispositivo.

## Tecnologias Utilizadas

- **Vue.js** - Framework JavaScript
- **Vuetify** - Biblioteca de componentes baseada em Material Design
- **Vue Router** - Gerenciamento de rotas
- **Axios** - Consumo da API de previsão do tempo
- **TypeScript** - Superset do JavaScript para tipagem estática
- **Vercel** - Hospedagem da aplicação

## Screenshots

![Frame 1](https://i.ibb.co/tpQQnZ23/Design-sem-nome.png)

## Funcionalidades

- **Pesquisa por cidade**: Informe uma cidade no formato "Juiz de Fora, MG" para obter a previsão do tempo.
- **Localização do dispositivo**: Obtenha a previsão do tempo automaticamente com base na localização do usuário.

- **Responsividade**: Layout adaptável para dispositivos móveis e desktop, seguindo boas práticas de usabilidade.
- **Atualização dinâmica**: Os dados são carregados dinamicamente a partir da API.

## API Utilizada

Esta aplicação consome a API de previsão do tempo da HGBrasil:

- [Documentação da API](https://assets.hgbrasil.com/weather)
- **Importante**: Respeitar as limitações de requisições da API.

## Instalação e Execução

1. Clone este repositório:
   ```sh
   git clone https://github.com/wellingtonengps/weather-project
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd weather-project
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
5. Acesse no navegador: `http://localhost:3000`

## Hospedagem

O projeto está hospedado na **Vercel**:
[Acesse a aplicação aqui](https://weather-project-98mr.vercel.app/)
