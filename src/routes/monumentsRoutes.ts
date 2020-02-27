import express from 'express';

import MonumentsController from '../controllers/monumentsController';
import {DBReader} from "../interfaces/interfaces";

const monumentsRouter = express.Router();

function router(dbManager: DBReader){
    const monumentsController = new MonumentsController(dbManager);

    monumentsRouter.route('/:id')
        .get( async (req, res) => {
            const { id } = req.params;
            const monument = await monumentsController.getMonumentById(id);
            res.json(monument);
        });

    monumentsRouter.route('/')
        .get( async (req, res) => {
            let { limit, filter } = req.query;
            const monuments = await monumentsController.getMonuments(limit, filter);
            res.json(monuments);
        });

    return monumentsRouter;
}

export default router;
