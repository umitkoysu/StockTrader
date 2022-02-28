const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");
const {PortfolioStock} = require("./portfolio.stock");
const {PortfolioStockTransaction} = require("./portfolio.stock.transaction");
const {StockTransaction} = require("./stock.transaction");

const Stock = database.define("Stock",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    symbol:{
        type:DataTypes.STRING,
        allowNull:false
    },

    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },

    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    salableAmount:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },

    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
    },

    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

},{
    timestamps:true,
    tableName:"stocks",
})

Stock.PortfolioStock = Stock.hasMany(PortfolioStock,{foreignKey:"stockId" ,as:"portfolioStocks"});
PortfolioStock.Stock = PortfolioStock.belongsTo(Stock,{foreignKey:"stockId", sourceKey:"id" , as : "stock"});

Stock.StockTransaction = Stock.hasMany(StockTransaction,{foreignKey:"stockId", as:"stockTransactions"});
StockTransaction.Stock = StockTransaction.belongsTo(Stock,{foreignKey:"stockId", sourceKey:"id", as:"stock"});

Stock.PortfolioStockTransaction = Stock.hasMany(PortfolioStockTransaction,{foreignKey:"stockId", as:"portfolioStockTransactions"});
PortfolioStockTransaction.Stock = PortfolioStockTransaction.belongsTo(Stock,{foreignKey:"stockId", sourceKey:"id", as:"stock"});

module.exports = {Stock};