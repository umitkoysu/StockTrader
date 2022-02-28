const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");
const {TradeType} = require("./trade.type");

const PortfolioStockTransaction = database.define("PortfolioStockTransaction",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }

},{
    timestamps:true,

    tableName:"portfolio_stock_transactions",
})

PortfolioStockTransaction.TradeType = PortfolioStockTransaction.belongsTo(TradeType,{foreignKey:"tradeTypeId", sourceKey:"id" , as : "tradeType"});
TradeType.PortfolioStockTransaction = TradeType.hasMany(PortfolioStockTransaction,{foreignKey:"tradeTypeId", as:"portfolioStockTransactions"});

module.exports = {PortfolioStockTransaction};