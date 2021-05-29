import express from 'express';
import monumentsController from '../controllers/monumentsController';
import { DBReader, DBInput } from "../interfaces/interfaces";
import profileController from "../controllers/profileController";
import { InfluxSerivce } from "../services/influxService"

const debug = require('debug')('app:monumentsRouter.ts');

const monumentsRouter = express.Router();

function router(dbManager: DBReader | DBInput, cacheClient: any, influxService: InfluxSerivce){
    const {
        getMonumentById,
        getMonuments,
        commentMonument,
        likeMonument,
        getComments,
        favourMonument,
        getMonumentFavours,
        getGeographies
    } = monumentsController(dbManager);

    const { profileCheckAuthorized } = profileController(<DBInput>dbManager);

    initRouteHitsCounter(cacheClient, {
        'monument-id': 0,
        'monuments': 0
    });

    monumentsRouter.route('/')
        .all(async (req: any, res: any, next) => {
            incrementRouteHit(cacheClient, 'monuments');
            next();
        })
        .get( getMonuments );

    monumentsRouter.route('/geographies')
      .all(async (req: any, res: any, next) => {
          next();
      })
      .get( getGeographies );


    monumentsRouter.route('/favourites')
        .get( getMonumentFavours );

    monumentsRouter.route('/:id')
        .all(async (req: any, res: any, next: any) => {
            const { id: monumentId } = req.params;
            const user = req?.user;
            await influxService.writeMonumentVisit(1, monumentId, user?._id)
            incrementRouteHit(cacheClient, 'monument-id');
            next();
        })
        .get( getMonumentById );

    monumentsRouter.route('/:id/comments')
        .post(
            profileCheckAuthorized,
            commentMonument
        )
        .get(getComments);

    monumentsRouter.route('/:id/like')
        .get(
            profileCheckAuthorized,
            likeMonument
        );

    monumentsRouter.route('/:id/favour')
        .get(
            profileCheckAuthorized,
            favourMonument
        );

    return monumentsRouter;
}

function initRouteHitsCounter(cacheClient: any, routeCounters: Object) {
    Object.entries(routeCounters).forEach(([key, value]) => {
        cacheClient.set(key, value);
    })
}

function incrementRouteHit(cacheClient: any, routeKey: string){
    cacheClient.incr(routeKey, (err: any, repl: any) => {
        debug(`Amount of route '${ routeKey }' hits: ` + repl);
    });
}

export default router;
