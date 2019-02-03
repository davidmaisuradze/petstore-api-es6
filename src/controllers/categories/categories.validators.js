import Joi from 'joi';

export default {
    createCategory: {
        body: {
            title: Joi.string().max(250).required(),
            type: Joi.string().required()
        }
    },
    updateCategory: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().max(250).required()
        }
    },
    updateCategoryParent: {
        body: {
            id: Joi.string().required()
        }
    },
    deleteCategory: {
        params: {
            id: Joi.string()
        }
    }
}
