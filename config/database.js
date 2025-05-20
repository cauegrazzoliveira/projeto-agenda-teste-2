const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agenda_db', 'postgres', 'senha', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
