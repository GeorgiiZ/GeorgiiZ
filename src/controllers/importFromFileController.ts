import fs from "fs";
import util from 'util';
import path from 'path';
import mongoConfig from "../config/mongoConfig";
const { MongoClient } = require('mongodb');

const debug = require('debug')('app:importFromFileController');

const mongoHost = mongoConfig.host ||  'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';
const mongoUrl = `mongodb://${ mongoHost }:${ mongoPort }/${ dbName }`;

async function importMonuments(req: any, res: any) {
    const monuments = await getMonumentsFromFile();
    await insertMonuments(mongoUrl, monuments);
    res.send("Loading finished!");
}

const monumentsFilename = "monuments.json";

async function getMonumentsFromFile(): Promise<Array<any>> {
    const readFile = util.promisify(fs.readFile);
    const monumentsStr = await readFile(path.join(__dirname, `../../assets/${ monumentsFilename }`), "utf8");
    return JSON.parse(monumentsStr);
}

async function insertMonuments(dbUrl: string, monuments: Array<any>) : Promise<void>{
    let client;
    try {
        client = await MongoClient.connect(dbUrl);
        debug('Connected correctly to server');
        const db = client.db(dbName);
        await db.collection('monuments_1').insertMany(monuments);
        debug('Data inserted correctly!');
    } catch (err) {
        debug(err.stack);
    }
    client.close();
};


export { importMonuments }
