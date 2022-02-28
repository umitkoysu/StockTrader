const CustomException = require('./custom.exception');

class OperationException extends CustomException {
    constructor(message , statusCode = null, name = null){
        super();
        this.name = name ?? "OperationException";
        this.message = message;
        this.statusCode = statusCode ?? 500;
    }
}

module.exports = OperationException;