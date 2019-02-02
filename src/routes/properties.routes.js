import {Router} from 'express';
import validate from 'express-validation';

import * as PropertiesController from '../controllers/properties/properties.controller';
import validators from '../controllers/properties/properties.validators';
import authenticate from '../middlewares/authenticate';

const routes = new Router();

// GET
routes.get('/', PropertiesController.getProperties);

// POST
routes.post('/', authenticate, validate(validators.createProperty), PropertiesController.createProperty);

// PUT
routes.put('/', authenticate, validate(validators.updateProperty), PropertiesController.updateProperty);

// DELETE
routes.delete('/:id', authenticate, PropertiesController.deleteProperty);

export default routes;