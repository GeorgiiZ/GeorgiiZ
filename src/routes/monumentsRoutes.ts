import express from 'express';

import { getMonumentById, getMonuments } from '../controllers/monumentsController';

const monumentsRouter = express.Router();

function router(){
    monumentsRouter.route('/:id')
        .get( getMonumentById );

    monumentsRouter.route('/')
        .get( getMonuments );

    return monumentsRouter;
}

export default router;
