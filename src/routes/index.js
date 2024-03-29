import {Router} from 'express';
import path from 'path';

import AuthRoutes from './auth.routes';
import CategoryRoutes from './categories.routes';
import PropertyRoutes from './properties.routes';
import PropertyAttributeRoutes from './property-attributes.routes';
import PetRoutes from './pets.routes';

// middleware utils
import logError from '../utils/logError';

const routes = new Router();

routes.use('/auth', AuthRoutes);
routes.use('/category', CategoryRoutes);
routes.use('/property', PropertyRoutes);
routes.use('/propertyAttribute', PropertyAttributeRoutes);
routes.use('/pet', PetRoutes);

routes.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

routes.use(logError);

export default routes;
