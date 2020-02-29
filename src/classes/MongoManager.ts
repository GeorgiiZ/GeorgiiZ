import mongoConfig from "../config/mongoConfig";
const { MongoClient } = require('mongodb');
import {DBInput, DBReader} from '../interfaces/interfaces';

const debug = require('debug')('app:MongoManager.ts');

const mongoHost = mongoConfig.host ||  'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';
const mongoUrl = `mongodb://${ mongoHost }:${ mongoPort }/${ dbName }`;

export default class MongoManager implements DBInput, DBReader{
    async insertMany(collection: string, items: Array<any>): Promise<void> {
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
             await db.collection( collection ).insertMany(items);
            debug('Data inserted correctly!');
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    };

    async insertOne(collection: string, item: any): Promise<any> {
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            const results = await db.collection( collection ).insertOne(item);
            debug('Data inserted correctly!');
            return results.ops[0];
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    }

    async findMany(collection: string, filter:any, limit: number = 0) : Promise<Array<any> | undefined>{
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            const col = await db.collection( collection );
            const result = await col.find(filter).limit(limit).toArray();
            return result;
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    };

    async findOne(collection: string, filter: any){
        debug(filter);
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            const col = await db.collection( collection );
            const result = await col.findOne(filter);
            debug(result);
            return result;
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    }
}
