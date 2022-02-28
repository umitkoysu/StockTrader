const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { StockTransaction } = require('../../data/models/stock.transaction');
const { Stock } = require('../../data/models/stock');
const { stockTransactionCreateValidator} = require('./stock.transaction.validator');
const Op = require('sequelize').Op;

class StockTransactionService {

    async getList(stockId) {

        let predicate;
        
        if(stockId){
            predicate = {
                stockId: stockId
            };
        }
        
        let result = await StockTransaction.findAll({
            where: predicate,
            attributes: ["id", "price", "createdAt", "updatedAt"],
            include: [{
                model: Stock,
                as:"stock",
                attributes: ["id", "name", "symbol"]
            }]
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }
 
    async create(stockTransaction){

        await stockTransactionCreateValidator.validateAsync(stockTransaction);

        let result = await StockTransaction.create(stockTransaction);

    }

}

module.exports = new StockTransactionService();