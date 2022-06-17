import { StatusCodes } from 'http-status-codes';
import {Router, Request, Response, NextFunction} from 'express';
//import MSG from '..';

const initRoute = Router();


initRoute.get('/', ( req: Request, res: Response, next:NextFunction) => {
   res.status(StatusCodes.OK).send({string : 'BEM VINDO A PAGINA INICIAL | Acesse ao /status ou ao /users | para um UUID basta colocar / e o id'}) });

export default initRoute;