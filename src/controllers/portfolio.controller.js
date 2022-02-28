const portfolioService = require('../services/portfolios/portfolio.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');

exports.getById = async (req, res) => {
    const result = await portfolioService.getById(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.getList = async (req, res) => {
    const result = await portfolioService.getList(req.query);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.create = async (req, res) => {
    const result = await portfolioService.create(req.body);
    return res.status(httpStatus.CREATED).json(responseBuilder.success(result));
};

exports.update = async (req, res) => {
    const result = await portfolioService.update(parseInt(req.params.id), req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.passiveDelete = async (req, res) => {
    const result = await portfolioService.passiveDelete(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success());
};

