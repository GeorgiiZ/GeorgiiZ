import express from 'express';
import fs from "fs";
import util from 'util';
import path from 'path';
import mongoConfig from '../config/mongoConfig';
const { MongoClient } = require('mongodb');


const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

const mongoHost = mongoConfig.host ||  'localhost';
const mongoPort = mongoConfig.port || '27017';
const dbName = mongoConfig.db || 'myDB';

const mongoUrl = `mongodb://${ mongoHost }:${ mongoPort }/${ dbName }`;

function router() {
    adminRouter.route('/insertMonuments')
        .get(async (req: any, res: any) => {
            // const monuments = await OpenDataAccess.getMonuments();
            const readFile = util.promisify(fs.readFile);
            const monumentsStr = await readFile(path.join(__dirname, "../../assets/monuments.json"), "utf8");
            const monuments: Array<any> = JSON.parse(monumentsStr);
            // debug(monuments);

            (async function mongo(dbUrl, monuments) {
                let client;
                try {
                    client = await MongoClient.connect(dbUrl);
                    debug('Connected correctly to server');
                    const db = client.db(dbName);
                    const response = await db.collection('monuments').insertMany(monuments);
                    debug('Data inserted correctly!');
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }(mongoUrl, monuments));
            res.send("Loading finished!");
        });
    return adminRouter;
}



export default router;
