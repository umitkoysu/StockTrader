function getConnectionConfig() {
    let connection;

    if (process.env.DEV_MODE) {
        connection = {
            host: process.env.DDB_HOST,
            database: process.env.DDB_DATABASE,
            username: process.env.DDB_USERNAME,
            password: process.env.DDB_PASS,
            driver: process.env.DDB_DRIVER,
        }
    }
    else {
        connection = {
            host: process.env.PDB_HOST,
            database: process.env.PDB_DATABASE,
            username: process.env.PDB_USERNAME,
            password: process.env.PDB_PASS,
            driver: process.env.PDB_DRIVER,
        }
    }

    return connection;
}

module.exports = getConnectionConfig();