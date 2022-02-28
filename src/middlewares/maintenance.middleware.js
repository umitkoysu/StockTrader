const responseBuilder = require('../utils/response/response.builder');

const maintenanceMiddleware = (req,res,next) =>{

    let response = {
        name: "MAINTENANCE MODE",
        message : "System is in maintenance, please try later",
        datetime: new Date().toISOString(),
    };

    res.status(503).json(response);
} 


module.exports = maintenanceMiddleware;