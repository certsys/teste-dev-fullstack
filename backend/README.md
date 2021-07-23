# API Imóveis

Aqui você terá todos os passos necessários para que possa executar a API.

## 1 - Instalar o Docker

Caso ainda não possua o Docker instalado em sua maquina, poderá esta fazendo o download do mesmo nesse link (https://www.docker.com/products/docker-desktop) selecionando o sistema operacional da sua maquina.

## 2 - Criando o Banco de Dados

Após a instalação do Docker (caso não tivesse em sua maquina), irá executar o seguinte comando a baixo para a criação do Banco de Dados Mongo utilizado no projeto.

-> docker run --name imoveisDB -p 27017:27017 -d mongo:latest

## 3 - Clonar o projeto

Após criar o Banco de Dados Mongo no Docker, você irá clonar o projeto do repositorio.

## 4 - Instalar os pacotes

Após ter clonado o projeto, basta acessar a pasta do mesmo pelo terminal e executar o comando: yarn, para que todos os pacotes sejam instalados.

## 5 - Executar Mongo no Docker

Para executar o Mongo dentro do Docker basta executar o seguinte comando no terminal, sempre dentro da pasta do projeto.

-> yarn mongo:start

## 6 - Executando o projeto

Para rodar o projeto basta executar o seguinte comando no terminal dentro da pasta do projeto.

-> yarn dev:server

## OBS:
Caso você por algum motivo venha a reinicia a sua maquina, o container do Mongo no docker vai ser parado, para executar ele pode fazer de duas formas:

-> A primeira forma e acessar o aplicativo do Docker e starta o container.

-> A segunda maneira, basta acessar a pasta do projeto pelo terminal e executar o seguinte comando no terminal: yarn docker:start
