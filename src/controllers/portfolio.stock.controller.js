const portfolioStockService = require('../services/portfoliostocks/portfolio.stock.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');

exports.getById = async (req, res) => {
    const result = await portfolioStockService.getById(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.getList = async (req, res) => {
    const result = await portfolioStockService.getList(req.query);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.buyStock = async (req, res) => {
    const result = await portfolioStockService.buyStock(req.body);
    return res.status(httpStatus.CREATED).json(responseBuilder.success(result));
};

exports.sellStock = async (req, res) => {
    const result = await portfolioStockService.sellStock(req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

