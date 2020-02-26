import { MonumentsService } from '../services/MonumentsService';
import MongoManager from '../classes/MongoManager';
const debug = require('debug')('app:monumentsController');
import { DBReader } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';
import { QueryFilter } from '../classes/QueryFilter';


async function getMonumentById(req: any, res: any){
    try{
        const { id } = req.params;
        const monument = await MonumentsService.getMonumentById(id);
        res.json(monument);
    }
    catch (err) {
        debug(err);
        throw err;
    }
}

async function getMonuments(req: any, res: any){
    let { limit, filter: filterRequest  } = req.query;
    // debug(filterRequest);
    let dbManager = new MongoManager();
    const filter = QueryFilterFactory.setupFilter(filterRequest);
    // debug(filter);
    const monuments = await getMonumentsHelper(dbManager, filter, +limit);
    res.json(monuments);
}

async function getMonumentsHelper(dbManager: DBReader, filter: object|undefined, limit: number): Promise<Array<any>>{
    const monuments = await dbManager.findDocuments('monuments', filter, limit);
    return monuments;
}

export {
    getMonumentById,
    getMonuments
}
