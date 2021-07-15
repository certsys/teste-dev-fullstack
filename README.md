## CertImóveis
- NPM **6.14.8**
- Node.js **v.12.19.0**
- @vue/cli **4.1.1**
- MongoDB **v3.4.24**

Certifique-se de instalar as dependências do projeto:
`npm install`

A interface do **Robo 3T** pode ser utilizada para criar uma conexão com o MongoDB, como mostra a [figura](https://ibb.co/cyLqWTL). As collections e a database são criadas automaticamente. 
> Exemplo de string de conexão:
> mongodb://localhost:27020/propertydb
> Vai conectar no banco **localhost** na porta 27020, utilizando a database **propertydb**

> Se necessário, modifique o arquivo [.env](https://github.com/tfcabral1/teste-dev-fullstack/blob/main/backend/.env) para configurar as variáveis de ambiente relacionadas ao banco de dados.

Documentação da **API** pode ser acessada através do enpoint '/doc'. 

> *Considerando que o servidor esteja rodando localmente na porta 5118*, acesse a documentação pela url: http://localhost:5118/doc

Execução **backend**:
- Acesse o diretório referente ao backend e digite:
`node server.js`

Execução **frontend**:
- Acesse o diretório referente ao frontend e digite:
`npm run serve`
