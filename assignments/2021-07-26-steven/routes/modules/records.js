// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const Record = require('../../models/Record')
const Category = require('../../models/Category')

const categories = []
Category.find()
  .lean()
  .then((category) => categories.push(...category))
  .catch((error) => console.error(error))

// add record
router.get('/new', (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  if (!name || !category || !date || !amount) {
    return res.redirect('/new')
  }
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// edit record
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { categories, record }))
    .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// exports router
module.exports = router
