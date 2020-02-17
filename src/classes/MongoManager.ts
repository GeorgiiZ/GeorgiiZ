import mongoConfig from "../config/mongoConfig";
const { MongoClient } = require('mongodb');
import { DBInput } from '../interfaces/interfaces';

const debug = require('debug')('app:MongoManager.ts');

const mongoHost = mongoConfig.host ||  'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';
const mongoUrl = `mongodb://${ mongoHost }:${ mongoPort }/${ dbName }`;

export default class MongoManager implements DBInput{
    async insertMany(items: Array<any>, collectionName: string): Promise<void> {
        let client;
        try {
            client = await MongoClient.connect(mongoUrl);
            debug('Connected correctly to server');
            const db = client.db(dbName);
            await db.collection( collectionName ).insertMany(items);
            debug('Data inserted correctly!');
        } catch (err) {
            debug(err.stack);
        }
        client.close();
    };
}
