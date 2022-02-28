const express = require("express");
const bodyParser = require("body-parser");
const { queryParser } = require('express-query-parser')
const cors = require("cors");
const appConfigInit = require("./config/init.app.config");
const routerInit = require("./routes/init.route");
const { databaseInitializer, configutationInfo } = require("./init.js");
const exceptionHandlerMiddleware = require("./middlewares/exception.handler.middleware");
const maintenanceMiddleware = require("./middlewares/maintenance.middleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    queryParser({
        parseNull: true,
        parseBoolean: true,
        parseNumber: true,
    }));

appConfigInit()
    .then(async () => {
        
        //Cors policy
        app.use(cors());

        //Used middleware for maintenance of api
        if (global.MAINTENANCE_MODE)
            app.use(maintenanceMiddleware);

        //Endpoint implemented from routes folder
        app.use("/api/v1", routerInit);

        //Used middleware for exception handling
        app.use(exceptionHandlerMiddleware);

        //Start server and listen to port
        app.listen(global.PORT);

        //Check database connection and run migrations 
        await databaseInitializer();

        //Display configuration info on console
        configutationInfo();

    })
    .catch(err => {
        console.error(err);
    })

