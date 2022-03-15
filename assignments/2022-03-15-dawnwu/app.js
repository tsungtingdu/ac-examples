
/* 載入express */
const express = require('express')
const app = express()

/* 設定連接埠號 */
const port = 3000

/* 載入handlebars並設定*/
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* 載入json*/
const restaurantList = require('./restaurant.json')


/* 靜態檔案 */
app.use(express.static('public'))

/* render index */
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
  })
/* render show */
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)  
  res.render('show', { restaurant: restaurant })
})

/* 設定searchbar */
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
})
res.render('index', { restaurants: restaurants, keyword: keyword })
})


/* 監聽port */
app.listen(port , () => {
    console.log(`This is localhost:${port}`)
})
