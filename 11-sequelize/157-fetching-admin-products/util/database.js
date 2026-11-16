process.loadEnvFile();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',
  logging: false
});

module.exports = sequelize;