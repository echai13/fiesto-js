const router = require('express').Router()
const User = require('../db/models/user')
const { stripe_key } = require('../../secrets')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  const stripe = require('stripe')(stripe_key)
  return stripe.customers.create({
    description: `Customer ID for ${req.body.email}`,
  })
    .then(customer => {
      req.body.customerId = customer.id
      User.create(req.body)
        .then(user => {
          req.login(user, err => (err ? next(err) : res.json(user)))
        })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
          } else {
            next(err)
          }
        })
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
