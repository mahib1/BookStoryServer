const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Book_S_No: {
        type: Number,
        required: true,
        unique: true
    },
    Book_Name: {
        type: String,
        required: true
    },
    Book_Author: {
        type: String,
        required: true
    },
    Owner_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    Loaned_To_User_ID: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    Status: {
        type: String, 
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
