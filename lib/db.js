const {Sequelize} = require('sequelize');

/*  Define DB engine    -  See models.js for table definitions                          */
/*  dialect= DB Engine,
    storage= /path/databasefile.db - does not need to be created first  */


const sequelize = new Sequelize (
  {
    dialect: 'sqlite',
    storage:  './lib/database.db'
  }
);

module.exports = {sequelize};
