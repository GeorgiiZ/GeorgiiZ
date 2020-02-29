import express from 'express';
import {DBInput} from "../interfaces/interfaces";
import AuthController from "../controllers/authController";
import  User from '../models/User';
const passport=require('passport');

const debug = require('debug')('app:authRoutes');
const authRouter = express.Router();

function router(dbManager: DBInput) {
    const authController = new AuthController(dbManager);

    authRouter.route('/signUp')
        .post(async (req: any, res: any) => {
            const { username, password } = req.body;
            debug({ username, password });
            const newUser = await authController.signUp(new User(username, password));
            req.login(newUser, () => {
                res.redirect('/auth/profile');
            })
        });

    authRouter.route('/profile')
        .all((req: any, res: any, next: any)=>{
            if(req.user){
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req: any, res: any) => {
            res.json(req.user)
        });

    authRouter.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    return authRouter;
}

export default router;
