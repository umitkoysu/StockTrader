const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { Stock } = require('../../data/models/stock');
const { stockCreateValidator, stockUpdateValidator , stockPriceUpdateValidator} = require('./stock.validator');
const StockTransactionService = require('../stocktransactions/stock.transaction.service');
const Op = require('sequelize').Op;

class StockService {

    async getById(id) {

        ProcessCheckManager.checkId(id);

        let result = await Stock.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            attributes: ["id", "name", "symbol", "amount", "salableAmount", "price" , "active", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelValue(result);
        return result;

    }

    async getList(search) {

        let predicate = {
            isDeleted: false,
        };

        if (search) {
            predicate[Op.or] = {
                name: { [Op.like]: `%${search}%` },
                symbol: { [Op.like]: `%${search}%` },
            }
        }

        let result = await Stock.findAll({
            where: predicate,
            attributes: ["id", "name", "symbol", "amount", "salableAmount", "price" , "active", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

    async create(stock) {

        await stockCreateValidator.validateAsync(stock);

        stock.salableAmount = stock.amount;

        let result = await Stock.create(stock);

        let stockTransaction = {
            stockId: result.dataValues.id,
            price: stock.price,
        }

        await StockTransactionService.create(stockTransaction)

        return await this.getById(result.dataValues.id);

    }


    async update(id, stock) {

        await stockUpdateValidator.validateAsync(stock);

        let result = await Stock.update(stock, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }


    async updateSalableAmount(id, stock) {

        let result = await Stock.update({
            salableAmount: stock.salableAmount
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);

    }


    async passiveDelete(id) {

        let result = await Stock.update({
            isDeleted: true
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkPassiveDeleteResult(result);

    }

    async updatePrice(id, data) {

        let stock = await Stock.findOne({
            where: {
                isDeleted: false,
                id: id,
            }
        })

        ProcessCheckManager.checkReturnModelValue(stock);

        await stockPriceUpdateValidator.validateAsync(data);
        
        const lastUpdateHour = new Date(stock.updatedAt).getHours();

        if (lastUpdateHour == new Date().getHours()) {
            throwCustomException(global.ERROR_TYPE.StockPriceUpdateLimit);
        }

        let result = await Stock.update({
            price: data.price
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        let stockTransaction = {
            stockId: id,
            price: data.price,
        }

        await StockTransactionService.create(stockTransaction)

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }

    

}

module.exports = new StockService();