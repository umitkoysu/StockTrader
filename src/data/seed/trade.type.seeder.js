const { TradeType } = require('../models/trade.type');

const seed = {
    data: [
        {
            "name": "Buy"
        },
        {
            "name": "Sell"
        },

    ]
}

async function tradeTypeSeeder() {

    if (!await TradeType.findOne({ where: { name: seed.data[0].name } })) {
        await TradeType.bulkCreate(seed.data);
    }
}


module.exports = tradeTypeSeeder;