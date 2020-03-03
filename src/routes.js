import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import UserCreateValidator from './app/validators/UserCreateValidator';
import UserLoginValidator from './app/validators/UserLoginValidator';

import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/signin', UserLoginValidator, SessionController.store);
routes.post('/signup', UserCreateValidator, UserController.store);

routes.get('/users/:id', auth, UserController.show);

routes.use(next => {
  const err = { message: 'Endpoint invalido' };
  next(err);
});

export default routes;
