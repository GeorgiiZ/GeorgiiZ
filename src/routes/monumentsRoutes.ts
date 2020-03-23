import express from 'express';

import monumentsController from '../controllers/monumentsController';
import { DBReader, DBInput } from "../interfaces/interfaces";
const debug = require('debug')('app:monumentsRouter.ts');


const monumentsRouter = express.Router();

function router(dbManager: DBReader | DBInput){
    const { getMonumentById, getMonuments, commentMonument, likeMonument } = monumentsController(dbManager);

    monumentsRouter.route('/:id')
        .get( getMonumentById );

    monumentsRouter.route('/:id/comment')
        .post( commentMonument );

    monumentsRouter.route('/:id/like')
        .get( likeMonument);

    monumentsRouter.route('/')
        .get( getMonuments );

    return monumentsRouter;
}

export default router;
