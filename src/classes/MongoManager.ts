import mongoConfig from "../config/mongoConfig";
const { MongoClient } = require('mongodb');
import {DBInput, DBReader} from '../interfaces/interfaces';

const debug = require('debug')('app:MongoManager.ts');

const mongoHost = mongoConfig.host ||  'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';
const mongoUrl = `mongodb://${ mongoHost }:${ mongoPort }/${ dbName }`;

export default class MongoManager implements DBInput, DBReader{
    async insertMany(items: Array<any>, collection: string): Promise<void> {
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

    async findDocuments(collection: string, filter: Object = {}, limit: number = 0): Promise<void> {
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            const col = await db.collection( collection );
            const result = await col.find(filter)
                                .limit(limit)
                                .toArray();
            return result;
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    };
}
