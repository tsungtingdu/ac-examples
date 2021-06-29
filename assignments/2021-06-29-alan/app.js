// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here 固定使用語法格式
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine 固定使用語法格式
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  // create a variable to store resturant
  res.render('index', { restaurants: restaurantList.results })
})

//只需顯示單一元素於show渲染 使用find
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//搜尋出符合元素可能有多筆於index渲染 使用filter回傳一新陣列
app.get('/search', (req, res) => {
  //使用trim()避免關鍵字含空格
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

// setting static files
app.use(express.static('public'))

