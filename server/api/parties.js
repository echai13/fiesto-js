const router = require('express').Router()
const { Party, User, Attendee } = require('../db/models')
const stripeKey = require('../../secrets')
const stripe = require('stripe')(stripeKey)
module.exports = router

router.get(`/`, (req, res, next) => {
  Party.findAll({ include: [{ model: User, attributes: ['firstName'] }] })
    .then(parties => res.json(parties))
    .catch(next)
})

router.post(`/`, (req, res, next) => {
  console.log(req.body)
  User.findById(req.body.userId)
    .then(user => {
      user.addParties(req.body.partyId)
      res.sendStatus(200)
    })
    .catch(next)
})

router.get(`/host/:userId/`, (req, res, next) => {
  Party.findAll({ where: { userId: req.params.userId }, include: [{ model: Attendee }] })
    .then(parties => res.json(parties))
    .catch(next)
})

router.get(`/:partyId`, (req, res, next) => {
  Party.findOne({ where: { id: req.params.partyId }, include: [{ model: Attendee, attributes: [ 'attending' ], include: [{ model: User, attributes: [ 'id', 'firstName', 'lastName', 'customerId', 'passcode' ]}] }]})
    .then(party => res.json(party))
    .catch(next)
})

router.put(`/:partyId`, (req, res, next) => {
  console.log(req.body)
  console.log(req.params)
  if (req.body.passcode === req.body.user.passcode) {
    Attendee.findOne({ where: { userId: req.body.user.id, partyId: req.params.partyId }})
      .then(attendee => {
        return stripe.charges.create({
          amount: Math.round(req.body.price * 100),
          description: `Charge from ${req.body.user.firstName}`,
          currency: 'usd',
          customer: req.body.user.customerId
        })
          .then(_ => attendee.update({ attending: true }))
      })
      .then(_ => {
        Party.findOne({ where: { id: req.params.partyId }, include: [{ model: Attendee, include: [{ model: User, attributes: [ 'firstName', 'lastName' ]}] }]})
          .then(party => res.json(party))
          .catch(next)
      })
  }
  else { res.sendStatus(404) }
})
