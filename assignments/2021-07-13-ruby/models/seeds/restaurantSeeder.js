const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const restaurantList = require('../../restaurant.json')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 8; i++) {
    Restaurant.create({
      id: restaurantList.results[i].id,
      name: restaurantList.results[i].name,
      image: restaurantList.results[i].image,
      category: restaurantList.results[i].category,
      rating: restaurantList.results[i].rating,
      location: restaurantList.results[i].location,
      google_map: restaurantList.results[i].google_map,
      phone: restaurantList.results[i].phone,
      description: restaurantList.results[i].description
    })

  }
  console.log('done')
})