const {checkConnection} = require("./data/database");
const {migration} = require("./data/model.manager");
const seeder = require("./data/seed/seeder");
const logger = require("./utils/logger/logger");

const databaseInitializer = async () => {
    await checkConnection();
    await migration(global.DB_MIGRATION_ALTER, global.DB_MIGRATION_FORCE);
    await seeder();
}

const configutationInfo = () => {

    logger.info(`Dev Mode: ${global.DEV_MODE}`)
    logger.info(`Error Message Language: ${global.ERROR_LANG}`)
    logger.info(`Error File Log: ${global.ERROR_FILE_LOG}`)
    logger.info(`Database Query File Log: ${global.DB_QUERY_FILE_LOG}`)
    logger.info(`Maintenance Mode: ${global.MAINTENANCE_MODE}`)
    logger.info(`Database Migration Alter: ${global.DB_MIGRATION_ALTER}`)
    logger.info(`Database Migration Force: ${global.DB_MIGRATION_FORCE}`)
    logger.info(`Password Hash Salt: ${global.SALT}`)
    logger.warn(`Server is running on port: ${global.PORT}`)
}

module.exports = {databaseInitializer, configutationInfo};