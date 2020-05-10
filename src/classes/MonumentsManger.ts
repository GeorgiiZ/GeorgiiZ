const debug = require('debug')('app:MonumentsManager');
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

    async favourMonument(userId: number, monumentId : number){
        const result = await (<DBInput>this.dbManager).insertOne('favourites', {
            date: new Date(),
            userId: userId,
            monumentId: monumentId,
        });

        return result;
    }

    async getMonumentFavours(userId: number, limit : number, skip: number){
        const favourites = await (<DBReader>this.dbManager).findMany('favourites',
            { userId: userId },
            limit,
            skip
        );
        const monumentsIds = favourites.map( (x: any) => x.monumentId);
        const favouriteMonuments =  await (<DBReader>this.dbManager).findMany('monuments', {
            nativeId: { $in: monumentsIds }
        });

        return favouriteMonuments;
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

    async getComments(monumentId : number, limit: number, skip: number){
        const comments = await (<DBReader>this.dbManager).findMany(
            'comments',
            { monumentId },
            limit,
            skip
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

    async getMonuments(filterRequest: any, limit: number, skip: number){
        const filter = QueryFilterFactory.setupFilter(filterRequest);
        const mapFunc = contextSaveDecor(this.mapMonument, this);
        const monuments = await (<DBReader>this.dbManager).findMany(
            'monuments',
            filter,
            limit,
            skip,
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
