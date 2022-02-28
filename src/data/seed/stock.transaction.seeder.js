const { StockTransaction } = require('../models/stock.transaction');
const StockTransactionService = require('../../services/stocktransactions/stock.transaction.service');

async function stockTransactionSeeder(stocks) {

    if (stocks) {

        for (let i in stocks) {
            let stock = stocks[i];
            let transaction = {
                stockId: stock.id,
                price: stock.price,
            }

            await StockTransactionService.create(transaction);
        }
    }
}



module.exports = stockTransactionSeeder;