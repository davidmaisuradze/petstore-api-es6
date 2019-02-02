import {Router} from 'express';
import path from 'path';

import AuthRoutes from './auth.routes';
import CategoryRoutes from './categories.routes';
import PetRoutes from './pets.routes';
import PropertiesRoutes from './properties.routes';

// middleware utils
import logError from '../utils/logError';

const routes = new Router();

routes.use('/auth', AuthRoutes);
routes.use('/category', CategoryRoutes);
routes.use('/pet', PetRoutes);
routes.use('/property', PropertiesRoutes);

routes.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

routes.use(logError);

export default routes;