const stockService = require('../services/stocks/stock.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');

exports.getById = async (req, res) => {
    const result = await stockService.getById(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.getList = async (req, res) => {
    const result = await stockService.getList(req.query.search);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.create = async (req, res) => {
    const result = await stockService.create(req.body);
    return res.status(httpStatus.CREATED).json(responseBuilder.success(result));
};

exports.update = async (req, res) => {
    const result = await stockService.update(parseInt(req.params.id), req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.passiveDelete = async (req, res) => {
    const result = await stockService.passiveDelete(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success());
};

exports.updatePrice = async (req, res) => {
    const result = await stockService.updatePrice(parseInt(req.params.id), req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};