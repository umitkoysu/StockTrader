const tradeTypeService = require('../services/tradeTypes/trade.type.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');


exports.getList = async (req, res) => {
    const result = await tradeTypeService.getList();
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};
