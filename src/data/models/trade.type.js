const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");

const TradeType = database.define("TradeType",{
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

},{
    timestamps:false,
    tableName:"trade_types",
})

module.exports = {TradeType};