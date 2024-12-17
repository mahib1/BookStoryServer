const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  Owner_S_No: {
    type: Number,
    required: true,
    unique: true
  },
  Owner_Name: {
    type: String,
    required: true
  },
  Contact_Number: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Books_Owned: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const Owner = mongoose.model('Owner', OwnerSchema);
module.exports = Owner;
