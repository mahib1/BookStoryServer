const mongoose = require('mongoose');
require('dotenv').config();

const dbInit = async () => {
  const uri = process.env.URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.log("Error connecting to MongoDB Atlas:", err));
}


module.exports = dbInit;
