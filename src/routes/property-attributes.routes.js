import {Router} from 'express';
import validate from 'express-validation';

import * as PropertyAttributesController from '../controllers/property-attributes/property-attributes.controller';
import validators from '../controllers/property-attributes/property-attributes.validators';
import authenticate from '../middlewares/authenticate';

const routes = new Router();

// GET
routes.get('/', authenticate, PropertyAttributesController.getAttributes);
routes.get('/:propertyId', authenticate, validate(validators.getPropertyAttributesByPropertyId), PropertyAttributesController.getPropertyAttributesByPropertyId);

// POST
routes.post('/', authenticate, validate(validators.createPropertyAttribute), PropertyAttributesController.createPropertyAttribute);

// PUT
routes.put('/', authenticate, validate(validators.updatePropertyAttribute), PropertyAttributesController.updatePropertyAttribute);

// DELETE
routes.delete('/:id', authenticate, validate(validators.deletePropertyAttribute), PropertyAttributesController.deletePropertyAttribute);

export default routes;