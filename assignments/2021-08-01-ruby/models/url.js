const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  inputUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchema)