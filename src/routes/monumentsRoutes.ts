import express from 'express';

import { getMonumentById } from '../controllers/monumentsController';

const monumentsRouter = express.Router();


function router(){
    monumentsRouter.route('/:id')
        .get( getMonumentById );

    return monumentsRouter;
}

export default router;
