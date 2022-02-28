const PortfolioStockService = require('../../services/portfoliostocks/portfolio.stock.service');
const {PortfolioStock} = require('../models/portfolio.stock');
const seed = {
    buy: [
        {
            "amount": 100,
        },
        {
            "amount": 40,
        },
        {
            "amount": 50,
        },
        {
            "amount": 70,
        },
        {
            "amount": 20,
        }
    ],
    sell: [
        {
            "amount": 40,
        },
        {
            "amount": 20,
        },
        {
            "amount": 10,
        },
        {
            "amount": 20,
        },
        {
            "amount": 10,
        }
    ]
}

async function portfolioStockSeeder(stocks,portfolios) {

    if (await PortfolioStock.count() === 0) {
        
        await stocks.forEach((value, i) => {
            seed.buy[i].stockId = value.id;
            seed.sell[i].stockId = value.id;
        })

        await portfolios.forEach((value, i) => {
            seed.buy[i].portfolioId = value.id;
            seed.sell[i].portfolioId = value.id;
        })

        for(let b in seed.buy){
            await PortfolioStockService.buyStock(seed.buy[b]);
        }

        for(let s in seed.sell){
            await PortfolioStockService.sellStock(seed.sell[s]);

        }
    
    }

}


module.exports = portfolioStockSeeder;