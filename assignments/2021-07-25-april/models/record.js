const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Records', recordsSchema);