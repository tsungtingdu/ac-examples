const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String, 
    required: true 
  },
  en_name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
})
module.exports = mongoose.model('Category', categorySchema)