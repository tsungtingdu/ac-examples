// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Restaurant = require('../../models/restaurant')
const sortList = require('../../config/sortList')

// Index
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort()
    .then(restaurants => res.render('index', { restaurants, sortList }))
    .catch(error => console.error(error))
})

module.exports = router