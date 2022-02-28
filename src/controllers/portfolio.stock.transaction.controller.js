const portfolioStockTransactionService = require('../services/portfoliostocktransactions/portfolio.stock.transaction.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');


exports.getList = async (req, res) => {
    const result = await portfolioStockTransactionService.getList(req.query.stockId);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};
