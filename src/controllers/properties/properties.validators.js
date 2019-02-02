import Joi from 'joi';

export default {
    createProperty: {
        body: {
            name: Joi.string().required(),
            title: Joi.string().max(250),
            categoryId: Joi.string().required()
        }
    },
    updateProperty: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            title: Joi.string().max(250),
            parentId: Joi.string(),
            categoryId: Joi.string().required()
        }
    }
}