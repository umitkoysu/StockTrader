const Joi = require('joi');
const { joiPassword } = require('joi-password');


const stockCreateValidator = Joi.object({
    symbol: Joi.string().length(3).uppercase().required(),
    name: Joi.string().min(2).max(120).required(),
    price: Joi.number().greater(0).precision(2).required(),
    amount: Joi.number().greater(0).precision(0).required(),
})

const stockUpdateValidator = Joi.object({
    symbol: Joi.string().length(3).uppercase().required(),
    name: Joi.string().min(2).max(120).required(),
})

const stockPriceUpdateValidator = Joi.object({
    price: Joi.number().greater(0).precision(2)
})

module.exports = {stockCreateValidator,stockUpdateValidator,stockPriceUpdateValidator};