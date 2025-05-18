const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {type: String, required: true},
    comments: [String]
}, {versionKey: false});

const BookModel = mongoose.model('books', BookSchema);

module.exports = {BookModel};