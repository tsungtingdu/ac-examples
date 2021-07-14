// Require packages
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const Restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json')


// Status of connection with database
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// Express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Routes setting
// Index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// Create
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// Read
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description

  return Restaurant.create({
    name, image, category, rating, location, google_map, phone, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// Update
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const image = req.body.image
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.image = req.body.image
      restaurant.category = req.body.category
      restaurant.rating = req.body.rating
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.phone = req.body.phone
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find(
    {
      $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
    }
  )
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})