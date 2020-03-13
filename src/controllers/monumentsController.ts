import { MonumentsService } from '../services/MonumentsService';
const debug = require('debug')('app:monumentsController');
import MonumentsManager from '../classes/MonumentsManger';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';
import { DBReader, DBInput } from "../interfaces/interfaces";

export default function monumentsController(dbManager: DBReader | DBInput){
    const monumentsManager = new MonumentsManager(dbManager);

    async function getMonumentById(req: any, res: any) {
        const { id } = req.params;
        const monument = await monumentsManager.getMonumentById(id);
        res.json(monument);
    }

    async function getMonuments(req: any, res: any) {
        let { limit, filter } = req.query;
        const monuments = await monumentsManager.getMonuments(limit, filter);
        res.json(monuments);
    }

    return {
        getMonumentById,
        getMonuments
    }
}
