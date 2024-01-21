import { mongoConfig } from '../db_config/mongo-config';
const MongoClient = require('mongodb').MongoClient;
import { DBInput, DBReader } from '../interfaces/interfaces';

const debug = require('debug')('app:MongoService.ts');

const mongoHost = mongoConfig.host || 'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';
const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;

export default class MongoService implements DBInput, DBReader {
  defaultMap = (x: any) => x;

  async insertMany(collection: string, items: Array<any>): Promise<void> {
    let client: any;
    try {
      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      await db.collection(collection).insertMany(items);
      debug('Data inserted correctly!');
    } catch (err) {
      debug(err);
      throw err;
    } finally {
      client?.close();
      debug('connection closed');
    }
  }

  async insertOne(collection: string, item: any): Promise<any> {
    let client: any;
    try {
      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const results = await db.collection(collection).insertOne(item);
      debug('Data inserted correctly!');
      return results.ops[0];
    } catch (err) {
      debug(err);
      throw err;
    } finally {
      client?.close();
      debug('connection closed');
    }
  }

  async pushToSet(
    collection: string,
    query: any,
    updatedFields: any,
  ): Promise<void> {
    let client: any;
    try {
      debug(query, updatedFields);
      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const results = await db
        .collection(collection)
        .updateOne(query, { $addToSet: updatedFields });
      debug('Data inserted correctly!');
      // return results.ops[0];
    } catch (err) {
      debug(err);
      throw err;
    } finally {
      client?.close();
      debug('connection closed');
    }
  }

  async findMany(
    collection: string,
    filter: any = {},
    limit: number = 0,
    skip: number = 0,
    mapFunc: Function = this.defaultMap,
  ): Promise<Array<any> | undefined> {
    let client: any;
    try {
      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const result = await db
        .collection(collection)
        .find(filter)
        .limit(limit)
        .skip(skip)
        .map(mapFunc)
        .toArray();
      return result;
    } catch (err) {
      debug(err);
      throw err;
    } finally {
      client?.close();
      debug('connection closed');
    }
  }

  async findOne(collection: string, filter: any) {
    debug(filter);
    let client: any;
    try {
      client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const result = await db.collection(collection).findOne(filter);
      debug(result);
      return result;
    } catch (err) {
      debug(err);
      throw err;
    } finally {
      client?.close();
    }
  }
}
