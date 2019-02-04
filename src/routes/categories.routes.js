import {Router} from 'express';
import validate from 'express-validation';

import * as CategoriesController from '../controllers/categories/categories.controller';
import validators from '../controllers/categories/categories.validators';
import authenticate from '../middlewares/authenticate';

const routes = new Router();

// GET
routes.get('/', CategoriesController.getCategories);
routes.get('/getTree', CategoriesController.getCategoriesTree);

// POST
routes.post('/', authenticate, validate(validators.createCategory), CategoriesController.createCategory);

// PUT
routes.put('/', authenticate, validate(validators.updateCategory), CategoriesController.updateCategory);
routes.put('/updateCategoryParent', authenticate, validate(validators.updateCategoryParent), CategoriesController.updateCategoryParent);

// DELETE
routes.delete('/:categoryId', authenticate, validate(validators.deleteCategory), CategoriesController.deleteCategory);

export default routes;
