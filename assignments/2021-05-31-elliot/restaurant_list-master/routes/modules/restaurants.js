const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const { validator } = require('../../middleware/validator')

const generateCategoryObject = (categoryString) => {
  return {
    isCafe: categoryString === '咖啡',
    isBar: categoryString === '酒吧',
    isItaly: categoryString === '義式餐廳',
    isUSA: categoryString === '美式',
    isJapan: categoryString === '日本料理',
    isMiddleEast: categoryString === '中東料理',
    isTaiwan: categoryString === '台式',
    isKorea: categoryString === '韓式',
    isChina: categoryString === '中式',
    isHongKong: categoryString === '港式',
    isTailand: categoryString === '泰式'
  }
}



//CREATE
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', validator, (req, res) => {
  const { errors, restaurantObject } = res.locals
  if (errors.length) {
    return res.render('new', { errors, restaurantObject })
  }

  restaurantObject.userId = req.user._id
  return Restaurant.create(restaurantObject)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//READ
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      const restaurantObject = {}
      Object.assign(restaurantObject, restaurant)
      res.render('detail', { restaurantObject })
    })
    .catch(err => console.log(err))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      const categoryObject = generateCategoryObject(restaurant.category)
      const restaurantObject = { _id }
      Object.assign(restaurantObject, restaurant)
      res.render('edit', { restaurantObject, categoryObject })
    })
    .catch(err => console.log(err))
})

//UPDATE
router.put('/:restaurant_id', validator, (req, res) => {
  const { errors, restaurantObject } = res.locals
  const _id = req.params.restaurant_id
  if (errors.length) {
    return res.render('edit', { errors, restaurantObject })
  }

  const userId = req.user._id
  console.log('into routes/modules/restaurants.js/put', _id)

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, restaurantObject)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

//DELETE
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router