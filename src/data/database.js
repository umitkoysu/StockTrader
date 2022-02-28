const { Sequelize } = require("sequelize");
const logger = require("../utils/logger/logger");
const connection = require("./database.connection");

const database = new Sequelize(
    connection.database,
    connection.username,
    connection.password,
    {
        dialect: connection.driver,
        host: connection.host,
        logging: global.DB_QUERY_FILE_LOG ? msg => logger.debug(msg) : false,
    });


const checkConnection = async () => {
    try {
        await database.authenticate();
        logger.info('Database Connection: Success');
    }
    catch (err) {
        logger.error('Database Connection: Failed');
        logger.error(err)
    }
}

module.exports = { database, checkConnection};