import { MonumentsService } from '../services/MonumentsService';
const debug = require('debug')('app:monumentsController');

async function getMonumentById(req: any, res: any){
    try{
        const { id } = req.params;
        const monument = await MonumentsService.getMonumentById(id);
        res.send(monument);
    }
    catch (err) {
        debug(err);
        throw err;
    }
}

async function getMonuments(req: any, res: any){
    const { limit, filter  } = req.query;
}

export {
    getMonumentById,
    getMonuments
}
