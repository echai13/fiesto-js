const router = require('express').Router()
const {User} = require('../db/models')
const stripeKey = require('../../secrets')
const stripe = require('stripe')(stripeKey)
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'customerId']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post(`/card`, (req, res, next) => {
  console.log(req.body)
  User.findById(req.body.user.id)
    .then(user => {
      return stripe.tokens.create({
        card: {
          'number': req.body.cardNumber,
          'exp_month': req.body.expMonth,
          'exp_year': req.body.expYear,
          'cvc': req.body.cvc,
          'customer': req.body.user.customerId
        }
      })
        .then(token => stripe.customers.update(req.body.user.customerId, {
          source: token.id
        }))
        .then(_ => {
          user.update({ cardAvail: true })
          .then(updatedUser => res.json(updatedUser))
        })
    })
})
