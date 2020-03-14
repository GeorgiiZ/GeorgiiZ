import express from 'express';

import monumentsController from '../controllers/monumentsController';
import { DBReader, DBInput } from "../interfaces/interfaces";
const debug = require('debug')('app:monumentsRouter.ts');


const monumentsRouter = express.Router();

function router(dbManager: DBReader | DBInput){
    const { getMonumentById, getMonuments } = monumentsController(dbManager);

    monumentsRouter.route('/:id')
        .get( getMonumentById );

    monumentsRouter.route('/:id/comment')
        .post( async (req: any, res: any) => {
            const { id: monumentId } = req.params;
            const  { text: commentText} = req.body;
            if(req.isAuthenticated()){
                const user = req.user;
                const result = await (<DBInput>dbManager).insertOne('comments', {
                    date: new Date(),
                    text: commentText,
                    userId: user._id,
                    monumentId: monumentId,
                });
                res.send("you commented a monument!");
            } else {
                res.redirect('/authentication_form.html');
            }
        });

    monumentsRouter.route('/:id/like')
        .get( async (req: any, res) => {
            const { id: monumentId } = req.params;
            if(req.isAuthenticated()){
                const user = req.user;
                debug(user);
                await (<DBInput>dbManager).pushToExistedArray(
                    'monuments',
                    { nativeId: monumentId},
                    { likes: user._id });
                res.send("you liked a monument!");
            } else {
                res.redirect('/authentication_form.html');
            }
        });

    monumentsRouter.route('/')
        .get( getMonuments );

    return monumentsRouter;
}

export default router;
