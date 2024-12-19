// DON'T TOUCH THIS FILE UNLESS INSTRUCTED OTHERWISE!

require('dotenv').config();
const mongoose = require('mongoose');


const Book = require('../models/Book');       
const BookUnit = require('../models/BookUnit'); 
const User = require('../models/User');       


const createCollectionsAndIndexes = async () => {
  try {
    
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    
    await Book.createCollection();
    await Book.createIndexes({ ISBN: 1 });

    await BookUnit.createCollection();
    await BookUnit.createIndexes({ Book_ID: 1, Owner_ID: 1, Loaned_To_User_ID: 1 });

    await User.createCollection();
    await User.createIndexes({
      UID: 1,
      UserName: 1,
      contact_number: 1,
      Email: 1,
    });

    console.log('Collections and indexes created successfully');
  } catch (error) {
    console.error('Error creating collections and indexes:', error);
  } finally {
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  }
};


createCollectionsAndIndexes();

