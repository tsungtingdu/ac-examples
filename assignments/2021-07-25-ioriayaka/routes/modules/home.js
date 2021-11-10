const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

router.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  let totalAmount = 0
  Category.find()
    .lean()
    .then(category => {
      category.forEach(item => {
        categoryIcons[item.name] = item.icon
      })
    })
    .then(() => {
      Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { records, categories, selectedCategory, totalAmount })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router