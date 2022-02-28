const { throwCustomException } = require('../exception/exception.builder');


class ProcessCheckManager {

    static checkId(id) {

        if (id <= 0) {
            throwCustomException(global.ERROR_TYPE.IncorrectId);
        }
    }

    static checkReturnModelValue(result) {

        if (result == null) {
            throwCustomException(global.ERROR_TYPE.NotFound);
        }
    }

    static checkReturnModelList(result) {

        if (result.length == 0) {
            throwCustomException(global.ERROR_TYPE.NotFound);
        }
    }

    static checkUpdateResult(result){
        if(result[0] == 0){
            throwCustomException(global.ERROR_TYPE.DatabaseUpdateError);
        }
    }

    static checkPassiveDeleteResult(result){
        if(result[0] == 0){
            throwCustomException(global.ERROR_TYPE.DatabaseDeleteError);
        }
    }
}

module.exports = ProcessCheckManager;