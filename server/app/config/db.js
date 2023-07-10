const Sequelize = require('sequelize');

const sequelize = new Sequelize('reservation_system', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;