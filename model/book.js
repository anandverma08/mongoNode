const mongoose = require('mongoose');

const bookSchrema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    uId: { type: String, required: true }
})

const Book = mongoose.model('Book', bookSchrema);
module.exports = Book;