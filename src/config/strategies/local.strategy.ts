const passport = require('passport');
const { Strategy } = require('passport-local');

const debug = require('debug')('app:local.strategy');
import { DBReader } from '../../interfaces/interfaces';

function localStrategy(dbManager: DBReader) {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, async (username: any, password: any, done: any) => {
            debug('Connected correctly to server');
            const user = await dbManager.findOne('users', { name: username });
            debug(password);
            if (user.password === password) {
                done(null, user);
                debug('Successful auth!')
            } else {
                done(null, false);
                debug('Unsuccessful auth!')
            }
        }));
};

export { localStrategy };
