const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const sort = req.body.sort
  const userId = req.user._id
  const method = (s) => s.toString().includes('-') ? '-1' : '1'
  Restaurant.find({ userId })
    .lean()
    .sort({ [sort]: [method(sort)] })
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.error(error))
})

module.exports = router