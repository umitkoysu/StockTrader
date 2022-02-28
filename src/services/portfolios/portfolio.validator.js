const Joi = require('joi');

const portfolioCreateValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    userId : Joi.number().integer().required().greater(0),
})

const portfolioUpdateValidator = Joi.object({
    name: Joi.string().min(2).max(30).required(),
})

module.exports = { portfolioCreateValidator, portfolioUpdateValidator};