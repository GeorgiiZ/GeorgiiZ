import { MonumentsService } from '../services/MonumentsService';
const debug = require('debug')('app:monumentsController');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';

export default class MonumentsManager{
    readonly dbManager: DBReader | DBInput;

    constructor(dbManager: DBReader | DBInput){
        this.dbManager = dbManager;
    }

    public async getMonumentById(id: string){
        try {
            const monument = await MonumentsService.getMonumentById(id);
            return monument;
        }
        catch (err) {
            debug(err);
            throw err;
        }
    }

    public async getMonuments(limit: any, filterRequest: any){
        const filter = QueryFilterFactory.setupFilter(filterRequest);
        const monuments = await this.getMonumentsHelper(filter, +limit);
        return monuments;
    }

    async getMonumentsHelper(filter: object|undefined, limit: number): Promise<Array<any>>{
        const monuments = await (<DBReader>this.dbManager).findMany('monuments', filter, limit);
        return monuments;
    }
}
