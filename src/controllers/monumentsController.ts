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
    const queryFilter = QueryFilterFactory.setupFilter(filter);
    const monuments = await getMonumentsHelper(dbManager, queryFilter, +limit);
    res.send( JSON.stringify(monuments) );
}

async function getMonumentsHelper(dbManager: DBReader, filter: QueryFilter, limit: number): Promise<Array<any>>{
    filter.getFilter()
    const monuments = await dbManager.findDocuments('monuments', filter, limit);
    return monuments;
}

export {
    getMonumentById,
    getMonuments
}
