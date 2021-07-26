const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryIcon: {
        type: String,
        required: true
    },
    records: [{
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'Record'
    }]
});

module.exports = mongoose.model('Category', categorySchema);