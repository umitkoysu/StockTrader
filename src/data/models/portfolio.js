const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");
const {PortfolioStockTransaction} = require("./portfolio.stock.transaction");
const {PortfolioStock} = require("./portfolio.stock");

const Portfolio = database.define("Portfolio",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    

    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

},{
    timestamps:true,
    tableName:"portfolios",
})

Portfolio.PortfolioStockTransaction = Portfolio.hasMany(PortfolioStockTransaction,{foreignKey:"portfolioId"});
PortfolioStockTransaction.Portfolio = PortfolioStockTransaction.belongsTo(Portfolio,{foreignKey:"portfolioId", sourceKey:"id" , as : "portfolio"});

Portfolio.PortfolioStock = Portfolio.hasMany(PortfolioStock,{foreignKey:"portfolioId" ,as: "portfolioStocks"});
PortfolioStock.Portfolio = PortfolioStock.belongsTo(Portfolio,{foreignKey:"portfolioId", sourceKey:"id" , as : "portfolio"});

module.exports = {Portfolio};