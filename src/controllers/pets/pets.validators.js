import Joi from 'joi';

export default {
    getPets: {
        query: {
            page: Joi.number().required(),
            pageSize:Joi.number().required()
        }
    },
    createPet: {
        body: {
            name: Joi.string().required(),
            title: Joi.string().max(250),
            description: Joi.string(),
            age: Joi.number(),
            price: Joi.number(),
            properties: Joi.array(),
            categoryId: Joi.string().required()
        }
    },
    updatePet: {
        body: {
            id: Joi.string().required(),
            name: Joi.string().required(),
            title: Joi.string().max(250),
            description: Joi.string(),
            age: Joi.number(),
            price: Joi.number(),
            properties: Joi.array(),
            categoryId: Joi.string().required()
        }
    }
}