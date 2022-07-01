import { StatusCodes } from 'http-status-codes';
import  JWT  from 'jsonwebtoken';
import {Router, Request, Response, NextFunction} from 'express'
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import ForbiddenError from '../models/errors/forbidden.error.model';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authenticationmiddleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware , async (req: Request,res: Response, next: NextFunction)=>{
    try{
        const user = req.user; 

        if (!user){
            throw new ForbiddenError('Usuario Não Informado!');
        }
        const jwtPayload = { username: user.username};
        const jwtOptions = {subject: user?.uuid};
        const secretkey = 'my_secret_key';
        const jwt =  JWT.sign( jwtPayload, secretkey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt})
    } catch(error){
        next(error);
    }
})

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware ,(req:Request, res:Response, next:NextFunction)=>{
    res.sendStatus(StatusCodes.OK)// O MIDDEWARE ja esta fazendo toda a validação. seria somente para retornar ao user a validção OK
})

export default authorizationRoute;