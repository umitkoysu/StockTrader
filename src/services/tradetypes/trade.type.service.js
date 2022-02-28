const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { TradeType } = require('../../data/models/trade.type');
const Op = require('sequelize').Op;

class TradeTypeService {

    async getList(search) {

        let result = await TradeType.findAll({
            attributes: ["id", "name"],
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

}

module.exports = new TradeTypeService();