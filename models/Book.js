const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    Book_Name: {
        type: String,
        required: true,
    },

    Book_Author: {
        type: String,
        required: true,
    },

    Genre: {
        type: String,
        required: false,
    },

    ISBN: {
        type: String,
        required: false,
        unique: true,
    },

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
