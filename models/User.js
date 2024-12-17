const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    User_S_No: {
        type: Number,
        required: true,
        unique: true
    },
    UserName: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    BookLoaned: {
        type: String,
        required: false
    },
    Deleted_User: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
