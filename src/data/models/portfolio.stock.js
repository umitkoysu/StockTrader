const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");

const PortfolioStock = database.define("PortfolioStock",{
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

    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

},{
    timestamps:true,
    tableName:"portfolio_stocks",
})

module.exports = {PortfolioStock};