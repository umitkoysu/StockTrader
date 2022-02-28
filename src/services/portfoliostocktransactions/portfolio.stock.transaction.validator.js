const Joi = require('joi');
const { joiPassword } = require('joi-password');


const portfolioStockTransactionCreateValidator = Joi.object({
    price: Joi.number().greater(0).precision(2).required(),
    amount: Joi.number().greater(0).precision(0).required(),
    stockId: Joi.number().greater(0).required(),
    portfolioId: Joi.number().greater(0).required(),
    tradeTypeId: Joi.number().greater(0).required(),
})


module.exports = {portfolioStockTransactionCreateValidator};