import Joi from 'joi';

export default {
    getPropertiesTree:{
        params:{
            id:Joi.string()
        }
    },
    createProperty: {
        body: {
            title: Joi.string().max(250).required(),
            categoryId: Joi.string().required()
        }
    },
    updateProperty: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().max(250).required()
        }
    },
    updatePropertyParent: {
        body: {
            id: Joi.string().required()
        }
    },
    deleteProperty: {
        params: {
            id: Joi.string()
        }
    }
}
