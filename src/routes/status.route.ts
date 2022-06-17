import { StatusCodes } from 'http-status-codes';
import {Router, Request, Response, NextFunction} from 'express';
//import MSG from '..';


const statusRoute = Router();

//quando o server sobe ele manda a info no console.log
statusRoute.get('/status', ( req: Request, res: Response, next:NextFunction) => {
    res.status(StatusCodes.OK).send({string : " NODE REST rodando"});
});

export default statusRoute;
