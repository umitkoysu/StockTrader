const {Sequelize,DataTypes} = require("sequelize");
const {Stock} = require("./stock");
const {database} = require("../database");

const StockTransaction = database.define("StockTransaction",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },

},{
    timestamps:true,
    tableName:"stock_transactions",
})

module.exports = {StockTransaction};