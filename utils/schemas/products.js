const Joi = require('@hapi/joi');

const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(Joi.string().max(20));

const createProductSchema = {
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200).required(),
    price: Joi.number()
        .min(1)
        .max(1000000)
        .required(),
    inventory: Joi.number()
        .min(1)
        .max(1000000)
        .required(),
    image: Joi.string().required(),
    tags: productTagSchema
};

const updatePruductSchema = {
    name: Joi.string().max(100),
    description: Joi.string().max(200),
    price: Joi.number()
        .min(1)
        .max(1000000),
    inventory: Joi.number()
        .min(1)
        .max(1000000),
    image: Joi.string(),
    tags: productTagSchema
}

module.exports = {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updatePruductSchema
}