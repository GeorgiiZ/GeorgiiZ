import { MonumentsService } from '../services/MonumentsService';
import MongoManager from '../classes/MongoManager';
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
    let { limit, filter } = req.query;
    let dbManager = new MongoManager();
    const monuments = await dbManager.findDocuments('monuments', filter, +limit);
    res.send( JSON.stringify(monuments) );
}

export {
    getMonumentById,
    getMonuments
}
