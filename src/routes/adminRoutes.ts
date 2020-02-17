import express from 'express';
import  { importMonuments } from '../controllers/importFromFileController';
import MongoManager from "../classes/MongoManager";
import TextFileManager from "../classes/TextFileManager";

const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

function router() {
    adminRouter.route('/insertMonuments')
        .get(insertMonuments);

    return adminRouter;
}

async function insertMonuments(req: any, res: any) {
    let mongoManager = new MongoManager();
    let textFileManager = new TextFileManager();
    await importMonuments(mongoManager, textFileManager);
    res.send("Loading finished!");
}

export default router;
