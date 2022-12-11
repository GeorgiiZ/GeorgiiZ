const passport = require('passport');
import { localStrategy } from './strategies/local.strategy';
import { DBReader } from "../interfaces/interfaces";


function passportConfig(app: any, dbManager: DBReader) {
    localStrategy(dbManager);

    app.use(passport.initialize());
    app.use(passport.session());

    // Stores user in session
    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user: any, done: any) => {
        done(null, user);
    });
};

export { passportConfig };
