const CustomException = require('./custom.exception');

class ErrorTypeException extends CustomException {
    constructor(message , statusCode = null, name = null){
        super();
        this.name = name ?? "ErrorTypeException";
        this.message = message;
        this.statusCode = statusCode ?? 500;
    }
}

module.exports = ErrorTypeException;