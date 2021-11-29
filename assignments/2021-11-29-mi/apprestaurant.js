const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars') 
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout:'mainr'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('indexr', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restauranta = restaurantList.results.find(restaurantb => restaurantb.id.toString() === req.params.restaurant_id)
  res.render('showr', {restaurant: restauranta})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantfiltered = restaurantList.results.filter(restaurantitem => {
    if (restaurantitem.category.includes(keyword)) {
      return restaurantitem.category.includes(keyword)
    }
    if (restaurantitem.name.toLowerCase().includes(keyword.toLowerCase())) {
      return restaurantitem.name.toLowerCase().includes(keyword.toLowerCase())
    }
  })
  res.render('indexr', {restaurants: restaurantfiltered, keyword: keyword})
})
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})