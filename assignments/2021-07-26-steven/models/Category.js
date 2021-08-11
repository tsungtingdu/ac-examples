const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  icon: {
    type: String
  },
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Record'
    }
  ]
})

module.exports = mongoose.model('Category', categorySchema)
