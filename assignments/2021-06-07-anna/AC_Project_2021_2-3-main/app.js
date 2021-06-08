const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const restaurantsList = require('./restaurant.json')


app.get('/', (req, res) =>{
    
    res.render('index', {restaurants: restaurantsList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantsList.results.find(item => item.id.toString() === req.params.restaurant_id)  
    res.render('show', {restaurant: restaurant})
  })

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantsList.results.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', {restaurants: restaurants, keyword: keyword })
})


app.listen(port, ()=>{
    console.log(`Express is listening onhttp://localhost:${port}`)
})