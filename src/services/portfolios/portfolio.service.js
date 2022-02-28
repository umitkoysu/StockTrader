const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { Portfolio } = require('../../data/models/portfolio');
const { portfolioCreateValidator, portfolioUpdateValidator} = require('./portfolio.validator');
const Op = require('sequelize').Op;

class PortfolioService {

    async getById(id) {

        ProcessCheckManager.checkId(id);

        let result = await Portfolio.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            attributes: ["id", "name", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelValue(result);
        return result;

    }

    async getList(query) {

        let predicate = {
            isDeleted: false,
        };

        if (query.search) {
            predicate[Op.or] = {
                name: { [Op.like]: `%${query.search}%` },
            }
        }

        if(query.userId){
            predicate[Op.and] = {
                userId: query.userId
            }
        }

        let result = await Portfolio.findAll({
            where: predicate,
            attributes: ["id", "name", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

    async create(portfolio) {

        await portfolioCreateValidator.validateAsync(portfolio);

        let result = await Portfolio.create(portfolio);

        return await this.getById(result.dataValues.id);

    }


    async update(id, portfolio) {

        await portfolioUpdateValidator.validateAsync(portfolio);

        let result = await Portfolio.update(portfolio, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }

    async passiveDelete(id) {

        let result = await Portfolio.update({
            isDeleted: true
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkPassiveDeleteResult(result);

    }

}

module.exports = new PortfolioService();