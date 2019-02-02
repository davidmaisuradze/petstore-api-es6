import Joi from 'joi';

export default {
    createCategory: {
        body: {
            title: Joi.string().max(250)
        }
    },
    updateCategory: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().max(250)
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
