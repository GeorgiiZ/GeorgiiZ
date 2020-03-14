const debug = require('debug')('app:AuthController');
import { DBReader, DBInput } from '../interfaces/interfaces';
import  User from '../models/User';

export default function authController(dbManager: DBInput) {

    async function signUp(req: any, res: any) {
        debug(req.body);
        const { username, password } = req.body;
        debug({ username, password });
        const user = new User(username, password);
        const signedUser = await dbManager.insertOne('users', user);

        req.login(signedUser, () => {
            res.redirect('/auth/profile');
        });
    }

    function profileCheckAuthorized(req: any, res: any, next: any) {
        debug({ user: req.user });
        if(req.isAuthenticated()){
            next();
        } else {
            res.redirect('/');
        }
    }

    function getProfile(req: any, res: any) {
        res.json(req.user)
    }

    return {
        signUp,
        profileCheckAuthorized,
        getProfile
    }
}
