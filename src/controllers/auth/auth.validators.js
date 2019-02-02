import Joi from 'joi';

export default {
    login: {
        body: {
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().required()
        }
    },
    register: {
        body: {
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]*$/).min(6).required(),
            mobilePhone: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            birthDate: Joi.date().required(),
            genderId: Joi.string().required(),
            role: Joi.string()
        }
    }
};