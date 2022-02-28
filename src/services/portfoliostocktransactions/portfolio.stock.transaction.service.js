const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { PortfolioStockTransaction } = require('../../data/models/portfolio.stock.transaction');
const { portfolioStockTransactionCreateValidator} = require('./portfolio.stock.transaction.validator');
const { TradeType} = require('../../data/models/trade.type');
const Op = require('sequelize').Op;

class PortfolioStockTransactionService {

    async getList(portfolioId) {

        let predicate;

        if (portfolioId) {
            predicate.portfolioId = portfolioId;
        }

        let result = await PortfolioStockTransaction.findAll({
            where: predicate,
            attributes: ["id", "amount", "price", "createdAt", "updatedAt"],
            include: [{
                model: TradeType,
                as:"tradeType",
                attributes: ["id", "name"]
            }]
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

    async create(portfolioTransaction) {

        await portfolioStockTransactionCreateValidator.validateAsync(portfolioTransaction);

        let result = await PortfolioStockTransaction.create(portfolioTransaction);

    }
 

}

module.exports = new PortfolioStockTransactionService();