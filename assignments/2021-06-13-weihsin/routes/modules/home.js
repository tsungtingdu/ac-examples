// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const restaurant = require('../../models/restaurant')

// route setting with models seeder connection
router.get('/', (req, res) => {
  const sortBy = req.query.sortBy || '_id'

  restaurant.find()
    .lean()
    .sort(sortBy)
    .then(restaurants => res.render('index', { restaurants, sortBy }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router