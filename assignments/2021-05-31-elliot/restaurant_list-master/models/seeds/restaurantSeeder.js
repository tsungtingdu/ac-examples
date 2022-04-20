const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const SEED_RESTAURANTS = require('./restaurant.json')
const SEED_USER = require('./user.json')

const User = require('../user')

const generateArray = (num) => {
  const baseNum = 3 * num
  return [baseNum, baseNum + 1, baseNum + 2]
}

db.once('open', () => {
  for (let i = 0; i < SEED_USER.length; i++) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          generateArray(i),
          j => Restaurant.create({
            name: SEED_RESTAURANTS.results[j].name,
            name_en: SEED_RESTAURANTS.results[j].name_en,
            category: SEED_RESTAURANTS.results[j].category,
            image: SEED_RESTAURANTS.results[j].image,
            location: SEED_RESTAURANTS.results[j].location,
            phone: SEED_RESTAURANTS.results[j].phone,
            google_map: SEED_RESTAURANTS.results[j].google_map,
            rating: SEED_RESTAURANTS.results[j].rating,
            description: SEED_RESTAURANTS.results[j].description,
            userId: userId
          })
        ))
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  }
})
