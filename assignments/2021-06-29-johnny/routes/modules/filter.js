const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.post('/', (req, res) => {
  let totalAmount = 0
  filterCategory = req.body.filterCategory
  let filterList = []
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        if (record.category === filterCategory){
          filterList.push(record)
          totalAmount += record.amount
          Category.find()
            .then(categories => {
              categories.forEach(category => {
              if (record.category === category.name){
                record.icon = category.icon
              }
            })
          })
        } else if (filterCategory === '全部支出') {
          filterList.push(record)
          totalAmount += record.amount
          Category.find()
            .then(categories => {
              categories.forEach(category => {
              if (record.category === category.name){
                record.icon = category.icon
              }
            })
          })
        }
      })
      res.render('index', { filterList,totalAmount,filterCategory })
    })
})

module.exports = router