const User = require('./user')
const Party = require('./party')
const Attendee = require('./attendee')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Party.belongsTo(User)

Party.hasMany(Attendee)
Attendee.belongsTo(User)
Party.belongsToMany(User, { through: Attendee })
User.belongsToMany(Party, { through: Attendee })
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Attendee,
  Party
}
