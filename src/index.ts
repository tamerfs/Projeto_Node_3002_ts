import express from 'express';
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
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);
// iniciando nossa rota/ verificar o uso
app.use(initRoute);

//configração dos handdlers de erro
app.use(errorHanddler);

// iniciando o servidor escutando na porta setada na const acima
app.listen(port, () => {
    console.log(`app rodando no ${host}:${port}`)
})


//mensagem do console.log com concatenação de string + variaveis

//const MSG: string = `Server rodando com sucesso! vá para ${host}:${port}/status ou para /users  ainda adicione o UUID com /123 por exemplo`;
//export default MSG;