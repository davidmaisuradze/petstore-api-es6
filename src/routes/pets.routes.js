import {Router} from 'express';
import validate from 'express-validation';

import * as PetsController from '../controllers/pets/pets.controller';
import validators from '../controllers/pets/pets.validators';
import authenticate from '../middlewares/authenticate';

const routes = new Router();

// GET
routes.get('/', validate(validators.getPets), PetsController.getPets);
routes.get('/petsCount', PetsController.getPetsCount);

// POST
routes.post('/', authenticate, validate(validators.createPet), PetsController.createPet);

// PUT
routes.put('/', authenticate, validate(validators.updatePet), PetsController.updatePet);

// DELETE
routes.delete('/:id', authenticate, PetsController.deletePet);

export default routes;