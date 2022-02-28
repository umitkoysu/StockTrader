const userService = require('../services/users/user.service');
const responseBuilder = require('../utils/response/response.builder');
const httpStatus = require('http-status');

exports.getById = async (req, res) => {
    const result = await userService.getById(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.getList = async (req, res) => {
    const result = await userService.getList(req.query.search);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.create = async (req, res) => {
    const result = await userService.create(req.body);
    return res.status(httpStatus.CREATED).json(responseBuilder.success(result));
};

exports.update = async (req, res) => {
    const result = await userService.update(parseInt(req.params.id), req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success(result));
};

exports.passiveDelete = async (req, res) => {
    const result = await userService.passiveDelete(parseInt(req.params.id));
    return res.status(httpStatus.OK).json(responseBuilder.success());
};

exports.changePassword = async (req, res) => {
    const result = await userService.changePassword(parseInt(req.params.id), req.body);
    return res.status(httpStatus.OK).json(responseBuilder.success());
};