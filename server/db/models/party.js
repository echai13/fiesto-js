const Sequelize = require('sequelize')
const db = require('../db')

const Party = db.define('party', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 0.00
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Party
