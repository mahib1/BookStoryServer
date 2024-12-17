const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const uri = process.env.URI;

const User = require('./models/User');
const Owner = require('./models/Owner');
const Book = require('./models/Book'); 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error connecting to MongoDB Atlas:", err));

// POST route
app.post('/users', async (req, res) => {
    const { User_S_No, UserName, contact_number, Email, BookLoaned, Deleted_User } = req.body;

    const newUser = new User({
        User_S_No,
        UserName,
        contact_number,
        Email,
        BookLoaned,
        Deleted_User
    });

    try {
        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.post('/owners', async (req, res) => {
    const { Owner_S_No, Owner_Name, Contact_Number, Email, Books_Owned } = req.body;

    try {
        const books = await Book.find({ Book_Name: { $in: Books_Owned } });
        const bookIds = books.map(book => book._id);  // Get the ObjectId's of the books

        const newOwner = new Owner({
            Owner_S_No,
            Owner_Name,
            Contact_Number,
            Email,
            Books_Owned: bookIds
        });

        await newOwner.save();
        res.status(201).send("Owner created successfully");
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).send("Error creating owner");
    }
});

app.post('/books', async (req, res) => {
  const { Book_Name, Owner_ID, Loaned_To_User_ID, Status, Book_Author, Book_S_No } = req.body;

  try {
    const owner = await Owner.findOne({ Owner_S_No: Owner_ID });  // Assuming you're passing Owner_S_No
    const user = await User.findOne({ User_S_No: Loaned_To_User_ID });  // Assuming you're passing User_S_No

    if (!owner || !user) {
      return res.status(400).send('Owner or User not found');
    }

    const newBook = new Book({
      Book_Name,
      Owner_ID: owner._id,
      Loaned_To_User_ID: user._id,
      Status, 
      Book_Author,
      Book_S_No 
    });

    await newBook.save();
    res.status(201).send('Book created successfully');
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).send('Error creating book');
  }
});


//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
