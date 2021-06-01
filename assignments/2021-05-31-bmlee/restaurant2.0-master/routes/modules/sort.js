const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.post('/', (req, res) => {
  const sort = req.body.sort
  const method = (s) => s.toString().includes('-') ? '-1' : '1'
  console.log(sort, method(sort))
  Restaurant.find()
    .lean()
    .sort({ [sort]: [method(sort)] })
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.error(error))
})

module.exports = router