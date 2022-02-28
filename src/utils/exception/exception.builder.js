const ErrorTypeException = require('./error.type.exception');

function throwCustomException(err){

    throw new ErrorTypeException(err.message, err.statusCode, err.publicName);    
};


module.exports = {throwCustomException};

