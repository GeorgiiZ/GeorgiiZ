import profileController from "../../controllers/profileController";

const passport = require('passport');
const { Strategy } = require('passport-local');

const debug = require('debug')('app:local.strategy');
import { DBReader } from '../../interfaces/interfaces';

function localStrategy(dbManager: DBReader) {
    const { signIn } = profileController(dbManager);

    passport.use(
        new Strategy({
            usernameField: 'username',
            passwordField: 'password'
        }, signIn)
    );
};

export { localStrategy };
