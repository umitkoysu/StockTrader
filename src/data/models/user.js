const {Sequelize,DataTypes} = require("sequelize");
const {database} = require("../database");
const {Portfolio} = require("./portfolio");


const User = database.define("User",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
    },

    mail: {
        type: DataTypes.STRING,
        allowNull: true
    },

    balance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
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
    tableName:"users",
})


User.Portfolio = User.hasMany(Portfolio, {foreignKey:"userId", as:"portfolios"});
Portfolio.User = Portfolio.belongsTo(User, {foreignKey:"userId", sourceKey:"id" , as : "user"});

module.exports = {User};
