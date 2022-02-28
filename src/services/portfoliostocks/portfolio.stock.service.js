const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { PortfolioStock } = require('../../data/models/portfolio.stock');
const { portfolioStockSellValidator, portfolioStockBuyValidator } = require('./portfolio.stock.validator');
const PortfolioStockTransactionService = require('../portfoliostocktransactions/portfolio.stock.transaction.service');
const { Stock } = require('../../data/models/stock');
const { Portfolio } = require('../../data/models/portfolio');
const { User } = require('../../data/models/user');
const StockService = require('../stocks/stock.service');
const UserService = require('../users/user.service');
const Op = require('sequelize').Op;

class PortfolioStockService {

    async getById(id) {

        ProcessCheckManager.checkId(id);

        let result = await PortfolioStock.findOne({
            where: {
                id: id,
                isDeleted: false,
                amount:{[Op.gt]:0}
            },
            attributes: ["id", "amount", "createdAt", "updatedAt"],
            include: [{
                model: Stock,
                as:"stock",
                attributes: ["id", "name", "symbol"]
            },
            {
                model: Portfolio,
                as:"portfolio",
                attributes: ["id", "name"]
            }]
        });

        ProcessCheckManager.checkReturnModelValue(result);
        return result;

    }

    async getList(portfolioId) {

        let predicate = {
            isDeleted: false,
            amount:{[Op.gt]:0}
        };

        if (portfolioId) {
            predicate.portfolioId = portfolioId;
        }

        let result = await PortfolioStock.findAll({
            where: predicate,
            attributes: ["id", "amount", "createdAt", "updatedAt"],
            include: [{
                model: Stock,
                as:"stock",
                attributes: ["id", "name", "symbol"]
            },
            {
                model: Portfolio,
                as:"portfolio",
                attributes: ["id", "name"]
            }]
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

    async buyStock(portfolioStockBuy) {

        await portfolioStockBuyValidator.validateAsync(portfolioStockBuy);
        
        let portfolioStockid;
        const stock = await StockService.getById(portfolioStockBuy.stockId);
        const portfolio = await Portfolio.findOne({
            where:{
                id: portfolioStockBuy.portfolioId,
                isDeleted: false
            },
            attributes:["id", "name", "userId"],
            include: [{
                model: User,
                as:"user",
                attributes: ["id", "balance"]
            }
           
        ]
        });

        const portfolioStocks = await PortfolioStock.findOne({
            where:{
                stockId: portfolioStockBuy.stockId,
                portfolioId: portfolioStockBuy.portfolioId,
            },

            attributes:["id", "amount"]
        });

        if(stock.salableAmount < portfolioStockBuy.amount){
            throwCustomException(global.ERROR_TYPE.StockNotEnough);
        }

        const totalPrice = (portfolioStockBuy.amount*stock.price).toFixed(2);

        if(parseFloat(portfolio.user.balance) < totalPrice){
            throwCustomException(global.ERROR_TYPE.UserNotEnoughBalance);
        }

        const userBalance = {
            balance: portfolio.user.balance - totalPrice
        };

        await UserService.updateUserBalance(portfolio.user.id, userBalance);

        if(portfolioStocks){ 
            const totalAmount = portfolioStockBuy.amount + portfolioStocks.amount;
            await PortfolioStock.update({amount:totalAmount},{
                where:{
                    id: portfolioStocks.id
                }
            });
            portfolioStockid = portfolioStocks.id;

        }
        else{
            var result = await PortfolioStock.create(portfolioStockBuy);
            portfolioStockid = result.dataValues.id;
        }

        let portfolioStockTransaction = {
            portfolioId: portfolioStockBuy.portfolioId,
            stockId: portfolioStockBuy.stockId,
            amount: portfolioStockBuy.amount,
            price: totalPrice,
            tradeTypeId : 1,
        }

        await PortfolioStockTransactionService.create(portfolioStockTransaction)

        return await this.getById(portfolioStockid);

    }


    async sellStock(portfolioStockSell) {

        await portfolioStockSellValidator.validateAsync(portfolioStockSell);

        const stock = await StockService.getById(portfolioStockSell.stockId);
        const portfolio = await Portfolio.findOne({
            where:{
                id: portfolioStockSell.portfolioId,
                isDeleted: false
            },
            attributes:["id", "name", "userId"],
            include: [{
                model: User,
                as:"user",
                attributes: ["id", "balance"]
            }
           
        ]
        });

        const portfolioStocks = await PortfolioStock.findOne({
            where:{
                stockId: portfolioStockSell.stockId,
                portfolioId: portfolioStockSell.portfolioId,
            },

            attributes:["id", "amount"]
        });

        ProcessCheckManager.checkReturnModelValue(portfolioStocks);

        if(portfolioStocks.amount < portfolioStockSell.amount){
            throwCustomException(global.ERROR_TYPE.StockNotEnough);
        }

        const totalPrice = (portfolioStockSell.amount*stock.price).toFixed(2);
        const userBalance = {
            balance: portfolio.user.balance - totalPrice
        };

        await UserService.updateUserBalance(portfolio.user.id, userBalance);

        let result = await PortfolioStock.update({
            amount: portfolioStocks.amount - portfolioStockSell.amount
        },{
            where:{
                id: portfolioStocks.id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);

        let portfolioStockTransaction = {
            portfolioId: portfolioStockSell.portfolioId,
            stockId: portfolioStockSell.stockId,
            amount: portfolioStockSell.amount,
            price: totalPrice,
            tradeTypeId : 2,
        }

        await PortfolioStockTransactionService.create(portfolioStockTransaction)

        return await this.getById(portfolioStocks.id);

    }

}

module.exports = new PortfolioStockService();