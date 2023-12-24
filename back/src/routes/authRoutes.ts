import express from 'express';
import { DBInput } from '../interfaces/interfaces';
import profileController from '../controllers/profileController';
const passport = require('passport');

const debug = require('debug')('app:authRoutes');
const authRouter = express.Router();

function router(dbManager: DBInput) {
  const { signUp, profileCheckAuthorized, getProfile } =
    profileController(dbManager);

  authRouter.route('/signUp').post(signUp);

  authRouter.route('/profile').all(profileCheckAuthorized).get(getProfile);

  authRouter.route('/signin').post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }),
  );

  return authRouter;
}

export default router;
