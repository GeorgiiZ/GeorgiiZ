const debug = require('debug')('app:MongoService');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { QueryFilterFactory } from '../classes/QueryFilterFactory';
import { contextSaveDecor } from '../utility/functionDecorators'

export default class MonumentsManager {
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

    async getComments(monumentId : number, limit: any){
        const comments = await (<DBReader>this.dbManager).findMany(
            'comments',
            { monumentId },
            +limit
        );

        return comments;
    }

    async getMonumentById(id: number){
        const monument = await (<DBReader>this.dbManager).findOne(
            'monuments',
            { nativeId: id }
        );
        const likesCount = this.getLikesCount(monument.likes);
        const resultMonument = Object.assign(monument, { likesCount });
        debug(resultMonument);

        return resultMonument;
    }

    async getMonuments(limit: any, filterRequest: any){
        const filter = QueryFilterFactory.setupFilter(filterRequest);
        const monuments = await this.getMonumentsHelper(filter, +limit);

        return monuments;
    }

    private async getMonumentsHelper(filter: object|undefined, limit: number): Promise<Array<any>>{
        const mapFunc = contextSaveDecor(this.mapMonument, this);
        const monuments = await (<DBReader>this.dbManager).findMany(
            'monuments',
            filter,
            limit,
            mapFunc
        );

        return monuments;
    }

    private mapMonument(monument: any){
        const likesCount = this.getLikesCount(monument.likes);
        const resultMonument = Object.assign(monument, { likesCount });

        return resultMonument;
    }

    private getLikesCount(likes: any){
        return likes? likes.length : 0;
    }
}
