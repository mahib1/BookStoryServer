const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookUnitSchema = new Schema({
    Book_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    Owner_ID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Loaned_To_User_ID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    Status: {
        type: String,
        enum: ['Loaned', 'Available'],
        required: true,
        default: 'Available',
    },
});

const BookUnit = mongoose.model('BookUnit', bookUnitSchema);

module.exports = BookUnit;
