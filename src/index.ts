import express from 'express';
import bearerAuthenticationMiddleware from './middlewares/bearer-authenticationmiddleware';
import errorHanddler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/autorization.route';
import initRoute from './routes/init.route';//
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

//usando o express 
const app = express();

//configurações para a porta
const port = 3002;
const host = 'http://localhost';

// configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configuração de rotas.
app.use(initRoute);//  root '/'  padrão de entrada ao app
app.use(statusRoute); // root '/status' 
app.use(authorizationRoute); // root '/token' 
app.use(bearerAuthenticationMiddleware, usersRoute);// root '/users' para os comandos em http



//configração dos handdlers de erro
app.use(errorHanddler);

// iniciando o servidor escutando na porta setada na const acima
app.listen(port, () => {
    console.log(`app rodando no ${host}:${port}`)//mensagem do console com concatenação de string + variaveis
})

const link = 'ao '+host+':'+port+'/' ;

export default link;