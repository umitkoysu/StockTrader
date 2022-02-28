const {database} = require("./database");
const logger = require("../utils/logger/logger");

const {Stock} = require("./models/stock");
const {User} = require("./models/user");
const {Portfolio} = require("./models/portfolio");
const {PortfolioStockTransaction} = require("./models/portfolio.stock.transaction");
const {PortfolioStock} = require("./models/portfolio.stock");
const {StockTransaction} = require("./models/stock.transaction");
const {TradeType} = require("./models/trade.type");

const migration = async (force = false, alter = false) => {
    try {
        await database.sync({ force, alter });
        logger.info('Database Migration: Success');
    }
    catch (err) {
        logger.error('Database Migration: Failed');
        logger.error(err)
    }
}

module.exports = { migration };