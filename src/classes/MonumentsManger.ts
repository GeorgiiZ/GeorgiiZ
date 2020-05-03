const debug = require('debug')('app:MongoManager');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';

export default class MonumentsManager{
    readonly dbManager: DBReader | DBInput;

    constructor(dbManager: DBReader | DBInput){
        this.dbManager = dbManager;
    }

    async likeMonument(userId: number, monumentId : number){
        const result = await (<DBInput>this.dbManager).pushToSet(
            'monuments',
            { nativeId: monumentId },
            { likes: userId });
        return result;
    }

    async commentMonument(userId: number, monumentId : number, commentText: string){
        const result = await (<DBInput>this.dbManager).insertOne('comments', {
            date: new Date(),
            text: commentText,
            userId: userId,
            monumentId: monumentId,
        });
        return result;
    }

    async getMonumentById(id: string){
        try {
            const monument = await (<DBReader>this.dbManager).findOne('monuments',{
                nativeId: id
            });
            const likesCount = this.getLikesCount(monument.likes);
            const resultMonument = Object.assign(monument, { likesCount });
            debug(resultMonument);
            return resultMonument;
        }
        catch (err) {
            throw err;
        }
    }

    async getMonuments(limit: any, filterRequest: any){
        const filter = QueryFilterFactory.setupFilter(filterRequest);
        const monuments = await this.getMonumentsHelper(filter, +limit);
        return monuments;
    }

    private async getMonumentsHelper(filter: object|undefined, limit: number): Promise<Array<any>>{
        const monuments = await (<DBReader>this.dbManager).findMany('monuments', filter, limit, this.mapMonuments);
        return monuments;
    }

    private mapMonuments(monument: any){
        const likes = monument.likes
        const likesCount = likes? likes.length : 0;
        return Object.assign(monument, { likesCount })
    }

    private getLikesCount(likes: any){
        return likes? likes.length : 0;
    }
}
