import { StatusCodes } from 'http-status-codes';
import {Router, Request, Response, NextFunction} from 'express';
import link from '..';

const statusRoute = Router();

statusRoute.get('/status', ( req: Request, res: Response, next:NextFunction) => {
    res.status(StatusCodes.OK).send({string : ` NODE REST rodando  => volte ao ${link}`});
});

export default statusRoute;
