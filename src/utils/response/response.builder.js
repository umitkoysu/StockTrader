class ResponseBuilder {

    success() {

        if (arguments.length >= 1)
            return this.successData(arguments[0], arguments[1]);

        return this.successEmpty();

    }

    successData(data, message = null) {

        let response = {
            data: data,
            status: true,
            message: message ?? "Process Successful.",
        }

        return response
    }

    successEmpty() {

        let response = {
            status: true,
            message: "Process Successful.",
        }

        return response
    }

    failure() {

        if (arguments.length >= 1)
            return this.failureData(arguments[0], arguments[1])

        return this.failureEmpty();
    }


    failureData(data, message = null) {

        return {
            data: data,
            status: false,
            message: message ?? "Process Failed.",
        }

    }

    failureEmpty() {

        return {
            status: false,
            message: "Process Failed.",
        }

    }

    error(err) {
        return {
            status: false,
            name: err.name,
            message: err.message,
            stack: err.stack,
            datetime: new Date().toISOString(),
        };
    }

    maintenance(){
        return {
            name: "MAINTENANCE MODE",
            message : "Sistem bakım modunda lütfen daha sonra deneyiniz",
            datetime: new Date().toISOString(),
        };
    }
}


module.exports = new ResponseBuilder();