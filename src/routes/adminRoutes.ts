import express from 'express';
import  { importMonuments } from '../controllers/importFromFileController';
import {DBInput} from "../interfaces/interfaces";


const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

function router(dbManager: DBInput) {
    adminRouter.route('/insertMonuments')
        .get(async (req, res) => {
            await importMonuments(dbManager);
            res.send("Loading finished!");
        });

    return adminRouter;
}

export default router;
