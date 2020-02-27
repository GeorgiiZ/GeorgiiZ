import { MonumentsService } from '../services/MonumentsService';
import MongoManager from '../classes/MongoManager';
const debug = require('debug')('app:monumentsController');
import { DBReader } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';

export default class MonumentsController{
    readonly dbManager: DBReader;

    constructor(dbManager: DBReader){
        this.dbManager = dbManager;
    }

    async getMonumentById(id: string){
        try {
            const monument = await MonumentsService.getMonumentById(id);
            return monument;
        }
        catch (err) {
            debug(err);
            throw err;
        }
    }

    async getMonuments(limit: any, filterRequest: any){
        // debug(filterRequest);
        const filter = QueryFilterFactory.setupFilter(filterRequest);
        // debug(filter);
        const monuments = await this.getMonumentsHelper(filter, +limit);
        return monuments;
    }

    async getMonumentsHelper(filter: object|undefined, limit: number): Promise<Array<any>>{
        const monuments = await this.dbManager.findMany('monuments', filter, limit);
        return monuments;
    }
}
