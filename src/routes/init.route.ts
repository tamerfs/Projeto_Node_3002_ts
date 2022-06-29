import { StatusCodes } from 'http-status-codes';
import {Router, Request, Response, NextFunction} from 'express';
import link from '../index'
//import MSG from '..';

const initRoute = Router();


initRoute.get('/', ( req: Request, res: Response, next:NextFunction) => {
res.status(StatusCodes.OK).send({string : `BEM VINDO A PAGINA INICIAL => Acesse ${link}status | ${link}users | ${link}uuid | ${link}token `}) });

export default initRoute;

// 