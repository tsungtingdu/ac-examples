const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0
  let filterCategory = '全部支出'
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        Category.find()
          .then(categories => {
            categories.forEach(category => {
            if (record.category === category.name){
              record.icon = category.icon
            }
          })
        })
      })
      res.render('index', { records,totalAmount,filterCategory })
    })
    .catch(error => console.error(error))
})

module.exports = router
