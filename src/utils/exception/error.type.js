const fs = require('fs');
const path = require("path")
const httpStatus = require('http-status');

class ErrorType {
    
    DatabaseSaveError = {
        message: "Undefined",
        publicName: "SaveError",
        statusCode: httpStatus.INTERNAL_SERVER_ERROR
    };

    DatabaseUpdateError = {
        message: "Undefined",
        publicName: "UpdateError",
        statusCode: httpStatus.INTERNAL_SERVER_ERROR
    };

    DatabaseDeleteError = {
        message: "Undefined",
        publicName: "DeleteError",
        statusCode: httpStatus.BAD_REQUEST
    };

    NotFound = {
        message: "Undefined",
        publicName: "NotFound",
        statusCode: httpStatus.NOT_FOUND
    };

    UseMail = {
        message: "Undefined",
        publicName: "UseMail",
        statusCode: httpStatus.BAD_REQUEST
    };

    UseUsername = {
        message: "Undefined",
        publicName: "UseUsername",
        statusCode: httpStatus.BAD_REQUEST
    };

    IncorrectPassword = {
        message: "Undefined",
        publicName: "IncorrectPassword",
        statusCode: httpStatus.BAD_REQUEST
    };

    IncorrectMailOrUsername ={
        message: "Undefined",
        publicName: "IncorrectMailOrUsername",
        statusCode: httpStatus.BAD_REQUEST
    };

    
    MailOrUsernameAlreadyExist ={
        message: "Undefined",
        publicName: "MailOrUsernameAlreadyExist",
        statusCode: httpStatus.BAD_REQUEST
    };

    IncorrectId = {
        message: "Undefined",
        publicName:"IncorrectId",
        statusCode: httpStatus.BAD_REQUEST
    }

    StockPriceUpdateLimit = {
        message: "Undefined",
        publicName:"StockPriceUpdateLimit",
        statusCode: httpStatus.BAD_REQUEST
    }

    StockNotEnough = {
        message: "Undefined",
        publicName:"StockNotEnough",
        statusCode: httpStatus.BAD_REQUEST
    }

    UserNotEnoughBalance = {
        message: "Undefined",
        publicName:"UserNotEnoughBalance",
        statusCode: httpStatus.BAD_REQUEST
    }

    async createInstance(){
        let meta = await this.getLocalizationMessage();

        for(let property in meta){
            if(this.hasOwnProperty(property)){
                this[property].message = meta[property];
            }
        }

        return this;
        
    }

    async getLocalizationMessage(){
        const filePath = path.join(__dirname, global.ERROR_LOCALIZATION_PATH);

        let meta = await fs.readFileSync(filePath);
        return JSON.parse(meta);
    }
}

module.exports = ErrorType;