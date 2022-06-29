import  JWT  from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
//import userRepository from '../repositories/user.repository'; tirado por não precisar neste caso especifico consultar o usuario no BD.
// admin "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU2NDU5NDI5LCJzdWIiOiI3Njc4ZDQ1ZS0xNmI3LTRlOWEtOGQxNy01NmZhNzlmZjVlZTIifQ.oaU2IfdNHPM_EVw0jlXS4llHaqgZd7HVbOn6rD7WWGc"

async function bearerAuthenticationMiddleware(req:Request,res:Response,next:NextFunction){
    try {
        
        const authorizationHeader =  req.headers['authorization'];
        if (!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [autehnticationType, token] =authorizationHeader.split(' ');

        if(autehnticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação Invalido!');
        };

        const tokenPayload = JWT.verify(token, 'my_secret_key');
        
        if (typeof tokenPayload !== 'object'||  !tokenPayload.sub){
            throw new ForbiddenError('Token Invalido!');
        }
        //const uuid = tokenPayload.sub; no Token validado ja tem o usuario + ID, entao não precisaria consultar no DB 
        //const user = await userRepository.findById(uuid); 
        const user = { uuid: tokenPayload.sub, username : tokenPayload.username};
        req.user = user;

        next();//tenq ter o next se n para nele e ele n volta para o que o chamou

    } catch (error) {
        next(error);
    }
}

export default bearerAuthenticationMiddleware;