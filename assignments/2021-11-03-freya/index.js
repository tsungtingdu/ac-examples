const express = require('express')
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

const app = express()
const port  = 3000



app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))

// initial page root
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

// index page root
app.get('/restaurants/', (req, res)=>{
  res.render('index', {restaurants : restaurantsList.results})
})

// show page root
app.get("/restaurants/:restaurantId", (req, res) => {
  const restaurants = restaurantsList.results.find(restaurant=> restaurant.id === Number(req.params.restaurantId))
  res.render('show', { restaurants: restaurants })
})

// search root 
app.get('/search', (req, res)=>{
  const keyword = req.query.keyword
  const restaurants = restaurantsList.results.filter(function(res){return res.name.toLowerCase().includes(keyword.toLowerCase())}
  )
  let showErrMsg = false

  if(restaurants.length === 0){
      showErrMsg = true
  }

  res.render('index', { restaurants, keyword, showErrMsg})
})



app.listen(port, ()=> {
  console.log(`Express is running on http://localhost:${port}`)
})


