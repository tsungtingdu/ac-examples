// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const Record = require('../../models/Record')
const Category = require('../../models/Category')

// define home route
router.get('/', (req, res) => {
  const category = req.query.category
  const filter = req.query.filter ? { category: req.query.filter } : {}
  if (category) {
    filter.category = category
  }

  // asynchronous
  const categories = []
  Category.find()
    .lean()
    .then((category) => categories.push(...category))
    .catch((error) => console.log(error))

  Record.find(filter)
    .populate('category')
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => (totalAmount += record.amount))
      res.render('index', { categories, category, records, totalAmount })
    })
    .catch((error) => console.log(error))
})

// exports router
module.exports = router
