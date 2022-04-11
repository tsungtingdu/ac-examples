// 加入模組
const express = require('express')
const app = express()
// 相關變數
const port = 3000

// require handlebars
const exphbs = require('express-handlebars')
// 餐廳清單
const restaurantLists = require('./restaurant.json')

// setting template engine
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

// 靜態網頁
app.use(express.static('public'))

// 設定路由
app.get('/',(req,res) => {
    const restaurant = restaurantLists.results;
    res.render('index.handlebars',{restaurants:restaurant})
})

// show restaurants
app.get('/restaurants/:id',(req,res)=>{
    const list = restaurantLists.results;
    const Id = req.params.id;
    console.log(Id)
    let restaurant = list.find(restaurant => restaurant.id.toString() === Id)
    res.render('show.handlebars',{restaurant:restaurant})
})

// 搜尋功能路由
app.get('/search',(req,res) => {
    console.log(req.query.keyword)
    const list = restaurantLists.results;
    const searchedrestaurant = req.query.keyword;
    const restaurant = list.filter(restaurant => restaurant.name.toLowerCase().includes(searchedrestaurant.toLowerCase()) || restaurant.category.toLowerCase().includes(searchedrestaurant.toLowerCase()))
    res.render('index.handlebars',{restaurants:restaurant})
})

// 建立監聽
app.listen(port,()=>{
    console.log(`express is running on http://localhost:${port}`)
})