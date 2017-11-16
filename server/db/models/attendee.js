const Sequelize = require('sequelize')
const db = require('../db')

const Attendee = db.define('attendee', {
  attending: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Attendee
