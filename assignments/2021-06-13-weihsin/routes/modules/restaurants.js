// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const restaurant = require('../../models/restaurant')

// route setting for create new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

// route setting for catch created restaurant
router.post('/', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// route setting for show page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// route setting for getting edit function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// route setting for posting edit function
router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return restaurant.findById(id)
    .then(restaurantEdit => {
      restaurantEdit.name = name
      restaurantEdit.name_en = name_en
      restaurantEdit.category = category
      restaurantEdit.image = image
      restaurantEdit.location = location
      restaurantEdit.phone = phone
      restaurantEdit.google_map = google_map
      restaurantEdit.rating = rating
      restaurantEdit.description = description

      return restaurantEdit.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// route setting for deletion
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router