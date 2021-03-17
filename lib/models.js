const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../lib/db');

/* Define Model/Table   , see db.js for Database Type  */


// define Models and tables :  Portfolio, Wallet
class Portfolio extends Model {}

// table defined,  sequelize will create table 'Portfolios'
Portfolio.init({
    // Model attributes are defined here
    symbol: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    price: {
        type: DataTypes.FLOAT(10,2)
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Porfolio', // We need to choose the model name
});



//  define Model 'Wallet'   wallet/acount bal info
class Wallet extends Model {}

Wallet.init({
    // Model attributes are defined here
    value: {
        type: DataTypes.FLOAT(10,2)
        // allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Wallet', // We need to choose the model name
});
sequelize.sync({alter: true});


// NOTE: Code below will drop and recreate the DB again. Please use only in localhost. I have added a condition that checks for localhost before it runs
// if(process.env.BASE_URL.match('localhost')){
//     sequelize.sync({force: true});
// }

module.exports = {
    Portfolio, Wallet
};
