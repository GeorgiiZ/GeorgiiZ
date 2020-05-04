import express from 'express';

import monumentsController from '../controllers/monumentsController';
import { DBReader, DBInput } from "../interfaces/interfaces";
const debug = require('debug')('app:monumentsRouter.ts');


const monumentsRouter = express.Router();

function router(dbManager: DBReader | DBInput, cacheClient: any){
    const {
        getMonumentById,
        getMonuments,
        commentMonument,
        likeMonument,
        getComments
    } = monumentsController(dbManager);

    initRouteHitsCounter(cacheClient, {
        'monument-id': 0,
        'monument-like': 0,
        'monuments': 0
    });

    monumentsRouter.route('/')
        .all((req, res, next) => {
            incrementRouteHit(cacheClient, 'monuments');
            next();
        })
        .get( getMonuments );

    monumentsRouter.route('/:id')
        .all((req: any, res: any, next: any) => {
            incrementRouteHit(cacheClient, 'monument-id');
            next();
        })
        .get( getMonumentById );

    monumentsRouter.route('/:id/comments')
        .post( commentMonument )
        .get( getComments );

    monumentsRouter.route('/:id/like')
        .all((req, res, next)=>{
            incrementRouteHit(cacheClient, 'monument-like');
            next();
        })
        .get( likeMonument );

    return monumentsRouter;
}

function initRouteHitsCounter(cacheClient: any, routeCounters: Object) {
    Object.entries(routeCounters).forEach(([key, value]) =>{
        cacheClient.set(key, value);
    })
}

function incrementRouteHit(cacheClient: any, routeKey: string){
    cacheClient.incr(routeKey, (err: any, repl: any) => {
        debug(`Amount of route '${ routeKey }' hits: ` + repl);
    });
}

export default router;
