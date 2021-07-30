const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection 
 
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, location, phone, rating, google_map, image, description } = req.body
  if (!name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  }
  return Restaurant.create({ name, name_en, category, location, phone, rating, google_map, image, description })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch((error) => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      if (keyword) {
        restaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
      }
      if (restaurants.length === 0) {
        const error = '很遺憾，沒有符合搜尋的結果'
        return res.render('index', { error })
      }
      res.render('index', { restaurants: restaurants, keyword: keyword })
    })
    .catch(error => console.error(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((error) => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, location, phone, rating, google_map, image, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))

})

app.get('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
