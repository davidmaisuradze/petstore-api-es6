import Joi from 'joi';

export default {
    getByCategoryId:{
      params:{
          categoryId: Joi.string().required()
      }
    },
    createProperty: {
        body: {
            title: Joi.string().max(250).required(),
            type: Joi.string().required()
        }
    },
    updateProperty: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().max(250).required(),
            type: Joi.string().required()
        }
    },
    deleteProperty: {
        params: {
            id: Joi.string()
        }
    }
}
