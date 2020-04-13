import { MonumentsOpenData } from '../services/MonumentsOpenData';
const debug = require('debug')('app:monumentsController');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';

export default class MonumentsManager{
    readonly dbManager: DBReader | DBInput;

    constructor(dbManager: DBReader | DBInput){
        this.dbManager = dbManager;
    }

    public async likeMonument(userId: number, monumentId : number){
        const result = await (<DBInput>this.dbManager).pushToSet(
            'monuments',
            { nativeId: monumentId },
            { likes: userId });
        return result;
    }

    public async commentMonument(userId: number, monumentId : number, commentText: string){
        const result = await (<DBInput>this.dbManager).insertOne('comments', {
            date: new Date(),
            text: commentText,
            userId: userId,
            monumentId: monumentId,
        });
        return result;
    }

    public async getMonumentById(id: string){
        try {
            const monument = await MonumentsOpenData.getMonumentById(id);
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

    private async getMonumentsHelper(filter: object|undefined, limit: number): Promise<Array<any>>{
        const monuments = await (<DBReader>this.dbManager).findMany('monuments', filter, limit);
        return monuments;
    }
}
