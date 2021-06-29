// Require packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// queryString
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  })
  if (!restaurants.length) { res.render('nomatch') }
  else {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  }
})

// params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurantList => restaurantList.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})