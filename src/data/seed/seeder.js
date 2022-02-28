const userSeeder = require('./user.seeder');
const tradeTypeSeeder = require('./trade.type.seeder');
const stockSeeder = require('./stock.seeder');
const portfolioSeeder = require('./portfolio.seeder');
const portfolioStockSeeder = require('./portfolio.stock.seeder');

async function seeder(){
    await tradeTypeSeeder();
    let userResult = await userSeeder();
    let stockResult = await stockSeeder();
    let portfolioResult = await portfolioSeeder(userResult);
    await portfolioStockSeeder(stockResult,portfolioResult);
}

module.exports = seeder;