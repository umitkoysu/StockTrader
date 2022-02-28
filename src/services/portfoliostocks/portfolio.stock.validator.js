const Joi = require('joi');

const portfolioStockSellValidator = Joi.object({
    portfolioId: Joi.number().greater(0).required(),
    stockId: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).precision(0).required(),
})

const portfolioStockBuyValidator = Joi.object({
    portfolioId: Joi.number().greater(0).required(),
    stockId: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).precision(0).required(),
})

module.exports = {portfolioStockSellValidator,portfolioStockBuyValidator};