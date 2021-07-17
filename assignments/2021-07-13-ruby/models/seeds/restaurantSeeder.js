const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')

db.once('open', () => {
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