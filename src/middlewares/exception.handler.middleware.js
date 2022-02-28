const responseBuilder = require('../utils/response/response.builder');
const logger = require('../utils/logger/logger');
const httpStatus = require('http-status');

const exceptionHandlerMiddleware = (err, req, res, next) => {

    response = responseBuilder.error(err);

    if(global.ERROR_FILE_LOG)
        logger.error(response);
    
    res.status(err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR).json(response);
}

module.exports = exceptionHandlerMiddleware;