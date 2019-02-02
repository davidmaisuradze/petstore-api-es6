import {Router} from 'express';
import validate from 'express-validation';

import * as AuthController from '../controllers/auth/auth.controller';
import validators from '../controllers/auth/auth.validators';
import authenticate from "../middlewares/authenticate";

const routes = new Router();

// GET
routes.get('/currentUser', authenticate, AuthController.getCurrentUser);

// POST
routes.post('/register', validate(validators.register), AuthController.register);
routes.post('/login', validate(validators.login), AuthController.login);

export default routes;