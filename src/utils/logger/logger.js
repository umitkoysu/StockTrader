const { errorLogger, devModeLogger } = require("./logger.config");

class Logger {

    info(message) {
        devModeLogger.info(message);
    }

    log(level, message) {
        devModeLogger.log(level, message);
    }

    debug(message, jsonFormat = false) {
        if (jsonFormat)
            devModeLogger.debug(JSON.stringify(message));
        devModeLogger.debug(message);
    }

    error(err) {
        errorLogger.error(err);
    }

    warn(message) {
        devModeLogger.warn(message);
    }
}

module.exports = new Logger();