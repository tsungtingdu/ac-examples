const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000 

// import json file
const restaurantList = require('./restaurant.json') .results

// express template engine
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

// static file
app.use(express.static('public'))

// route setting
app.get('/',(req,res) =>{
// past the restaurant data into inddex partial template
  res.render('index',{ restaurant: restaurantList})
})

// dynamic route in show
app.get('/restaurants/:restaurants_id',(req,res) =>{
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurants_id  )
  res.render('show', { restaurant: restaurant})

})

// define search route
app.get('/search',(req,res) =>{
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant =>
   isSearchName(restaurant.name,keyword) || isSearchName(restaurant.category,keyword))
  res.render('index',{ restaurant: restaurants, keyword:keyword})

})

// define search function
function isSearchName(name,keyword){
  return name.toLowerCase().includes(keyword.toLowerCase())
}
// listen on express server
app.listen(port,() =>{
  console.log(`Express is listening on localhost:${port}`)
})