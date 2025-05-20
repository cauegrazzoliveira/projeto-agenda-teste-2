const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Appointment = sequelize.define('Appointment', {
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  atendenteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associações (se desejar usar depois)
User.hasMany(Appointment, { foreignKey: 'usuarioId', as: 'AgendamentosUsuario' });
User.hasMany(Appointment, { foreignKey: 'atendenteId', as: 'AgendamentosAtendente' });
Appointment.belongsTo(User, { foreignKey: 'usuarioId', as: 'Usuario' });
Appointment.belongsTo(User, { foreignKey: 'atendenteId', as: 'Atendente' });

module.exports = Appointment;
