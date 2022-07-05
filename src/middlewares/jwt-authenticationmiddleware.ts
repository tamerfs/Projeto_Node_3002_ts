import  JWT  from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
//import userRepository from '../repositories/user.repository'; tirado por não precisar neste caso especifico consultar o usuario no BD.

async function jwtAuthenticationMiddleware(req:Request,res:Response,next:NextFunction){
    try {
        const authorizationHeader =  req.headers['authorization'];
        if (!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }
        const [autehnticationType, token] =authorizationHeader.split(' ');
        if(autehnticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação Invalido!');
        };

        try {   
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
                throw new ForbiddenError('Token Inválido')
        }


    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;