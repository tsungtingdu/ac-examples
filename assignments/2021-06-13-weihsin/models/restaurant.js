const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: String,

  name: {
    type: String,
    required: true
  },

  name_en: String,

  category: String,

  image: String,

  location: {
    type: String,
    required: true
  },

  phone: String,

  google_map: String,

  rating: Number,

  description: String
})
module.exports = mongoose.model('Restaurant', restaurantSchema)