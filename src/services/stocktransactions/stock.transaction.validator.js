const Joi = require('joi');
const { joiPassword } = require('joi-password');


const stockTransactionCreateValidator = Joi.object({
    stockId: Joi.number().greater(0).required(),
    price: Joi.number().greater(0).precision(2).required(),

})


module.exports = {stockTransactionCreateValidator};