const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    item: {
        type: String,
        require: true
    }
})

const ListModel = mongoose.model('items', schema)

module.exports = ListModel