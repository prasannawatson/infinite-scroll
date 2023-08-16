const Sequelize = require("sequelize");

const sequelize = new Sequelize('Synergy-data-new', 'postgres', '12345', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
  camelCase: true
})

module.exports = sequelize;
