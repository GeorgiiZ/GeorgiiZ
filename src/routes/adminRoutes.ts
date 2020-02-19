import express from 'express';
import  { importMonuments } from '../controllers/importFromFileController';


const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

function router() {
    adminRouter.route('/insertMonuments')
        .get(importMonuments);

    return adminRouter;
}

export default router;
