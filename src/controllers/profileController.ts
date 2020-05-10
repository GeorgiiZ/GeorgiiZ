const debug = require('debug')('app:AuthController');
import { DBReader, DBInput } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';
import  User from '../models/User';

export default function profileController(dbManager: DBInput | DBReader) {

    async function signUp(req: any, res: any) {
        const { username, password } = req.body;
        const user = new User(username, <string>Md5.hashStr(password));
        const signedUser = await (<DBInput>dbManager).insertOne('users', user);

        req.login(signedUser, () => {
            res.redirect('/auth/profile');
        });
    }

    async function signIn(username: any, password: any, done: any) {
        const user = await (<DBReader>dbManager).findOne('users', { name: username });
        if (user.password === Md5.hashStr(password)) {
            done(null, user);
            debug('Successful auth!')
        } else {
            done(null, false);
            debug('Unsuccessful auth!')
        }
    }

    function profileCheckAuthorized(req: any, res: any, next: any) {
        debug({ user: req.user });
        if(req.isAuthenticated()){
            next();
        } else {
            res.redirect('/authentication_form.html');
        }
    }

    function getProfile(req: any, res: any) {
        res.json(req.user)
    }

    return {
        signUp,
        profileCheckAuthorized,
        getProfile,
        signIn
    }
}
