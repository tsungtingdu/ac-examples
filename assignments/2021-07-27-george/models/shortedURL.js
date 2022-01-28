const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortedURLSchema = new Schema({
  randomCode: {
    type: String,
    require: true,
    trim: true
  },
  targetURL: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('ShortedURL', shortedURLSchema)