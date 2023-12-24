const debug = require('debug')('app:MonumentsManager');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { contextSaveDecor } from '../utility/decorators';
import Comment from '../models/Comment';
import FavouriteMonument from '../models/FavouriteMonument';

export default class MonumentsManager {
  readonly dbManager: DBReader | DBInput;

  constructor(dbManager: DBReader | DBInput) {
    this.dbManager = dbManager;
  }

  async likeMonument(userId: number, monumentId: number) {
    const result = await (<DBInput>this.dbManager).pushToSet(
      'monuments',
      { nativeId: monumentId },
      { likes: userId },
    );

    return result;
  }

  async favourMonument(userId: number, monumentId: number) {
    const result = await (<DBInput>this.dbManager).insertOne(
      'favourites',
      new FavouriteMonument(userId, monumentId),
    );

    return result;
  }

  async getMonumentFavours(userId: number, limit: number, skip: number) {
    const favourites = await (<DBReader>this.dbManager).findMany(
      'favourites',
      { userId: userId },
      limit,
      skip,
    );
    const monumentsIds = favourites.map((x: any) => x.monumentId);
    const favouriteMonuments = await (<DBReader>this.dbManager).findMany(
      'monuments',
      {
        nativeId: { $in: monumentsIds },
      },
    );

    return favouriteMonuments;
  }

  async commentMonument(
    userId: number,
    monumentId: number,
    commentText: string,
  ) {
    const result = await (<DBInput>this.dbManager).insertOne(
      'comments',
      new Comment(commentText, userId, monumentId),
    );

    return result;
  }

  async getComments(monumentId: number, limit: number, skip: number) {
    const comments = await (<DBReader>this.dbManager).findMany(
      'comments',
      { monumentId },
      limit,
      skip,
    );

    return comments;
  }

  async getMonumentById(id: number) {
    const monument = await (<DBReader>this.dbManager).findOne('monuments', {
      nativeId: id,
    });
    const likesCount = this.getLikesCount(monument.likes);
    const resultMonument = Object.assign(monument, { likesCount });

    return resultMonument;
  }

  async getMonuments(filter: any, limit: number, skip: number) {
    const mapFunc = contextSaveDecor(this.mapMonument, this);
    const monuments = await (<DBReader>this.dbManager).findMany(
      'monuments',
      filter,
      limit,
      skip,
      mapFunc,
    );

    return monuments;
  }

  async getGeographies() {
    const geographies = await (<DBReader>this.dbManager).findMany(
      'geographies',
      {},
    );
    return geographies;
  }

  private mapMonument(monument: any) {
    const likesCount = this.getLikesCount(monument.likes);
    const resultMonument = Object.assign(monument, { likesCount });

    return resultMonument;
  }

  private getLikesCount(likes: any) {
    return likes ? likes.length : 0;
  }
}
