const { Stock } = require('../models/stock');

const seed = {
    data: [
        {
            "symbol":"ACC",
            "name":"A.C.C Company Stock",
            "price": 20.00,
            "amount":10000,
            "salableAmount":10000,
        },
        {
            "symbol":"BCC",
            "name":"B.C.C Company Stock",
            "price": 40.00,
            "amount":10000,
            "salableAmount":10000,

        },
        {
            "symbol":"CCC",
            "name":"C.C.C Company Stock",
            "price": 60.00,
            "amount":10000,
            "salableAmount":10000,

        },
        {
            "symbol":"DCC",
            "name":"D.C.C Company Stock",
            "price": 80.00,
            "amount":10000,
            "salableAmount":10000,

        },
        {
            "symbol":"ECC",
            "name":"E.C.C Company Stock",
            "price": 100.00,
            "amount":10000,
            "salableAmount":10000,

        },

    ]
}

async function stockSeeder() {

    if (!await Stock.findOne({ where: { symbol: seed.data[0].symbol } })) {
        return await Stock.bulkCreate(seed.data);
    }
}


module.exports = stockSeeder;