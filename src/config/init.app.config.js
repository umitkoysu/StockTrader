const dotenv = require("dotenv");
const ErrorType = require("../utils/exception/error.type");
dotenv.config();

const initialize = async () =>{

    //Server running on port
    global.PORT = process.env.PORT;

    //App runtime mode
    global.DEV_MODE = process.env.DEV_MODE === "true";

    //App error message language 
    global.ERROR_LANG = process.env.ERROR_LANG;

    //Load seed data
    global.SEED_DATA = process.env.SEED_DATA === "true";

    //App maintenance mode 
    global.MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

    //Error message lacalization file path
    global.ERROR_LOCALIZATION_PATH = `../localization/error.type.${global.ERROR_LANG}.json`;

    //Enable error file log
    global.ERROR_FILE_LOG = process.env.ERROR_FILE_LOG === "true";

    //Enable database sql query file log for debug
    global.DB_QUERY_FILE_LOG = process.env.DB_QUERY_FILE_LOG === "true";

    //Sequileze migration parameters
    global.DB_MIGRATION_FORCE = process.env.DB_MIGRATION_FORCE === "true";
    global.DB_MIGRATION_ALTER = process.env.DB_MIGRATION_ALTER === "true";

    //Bcrypt salt for hashing
    global.SALT = process.env.SALT;
    
    //Read ErrorType meta from localization json file and create instance of ErrorType
    global.ERROR_TYPE = await new ErrorType().createInstance();
};


module.exports = initialize;





