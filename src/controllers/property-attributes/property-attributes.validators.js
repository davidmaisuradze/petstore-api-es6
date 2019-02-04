import Joi from 'joi';

export default {
    getPropertyAttributesByPropertyId: {
        params: {
            propertyId: Joi.string().required()
        }
    },
    createPropertyAttribute: {
        body: {
            value: Joi.string().required(),
            type: Joi.string().required()
        }
    },
    updatePropertyAttribute: {
        body: {
            value: Joi.string().required(),
            type: Joi.string().required()
        }
    },
    deletePropertyAttribute: {
        params: {
            id: Joi.string().required()
        }
    }
}