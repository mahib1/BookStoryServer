const AppInit = require('./Server');
const dbInit = require('./dbConnect');

dbInit();
const app = AppInit();

const User = require('./models/User');
const BookUnit = require('./models/BookUnit');
const Book = require('./models/Book'); 

app.post('/books', async (req, res) => {
  try {
    const { Book_Name, Book_Author, Genre, ISBN } = req.body;

    const newBook = new Book({
      Book_Name,
      Book_Author,
      Genre,
      ISBN,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Error creating book', error });
  }
});

app.post('/bookunits', async (req, res) => {
  try {
    const { Book_ID, Owner_ID, Loaned_To_User_ID, Status } = req.body;

    const newBookUnit = new BookUnit({
      Book_ID,
      Owner_ID,
      Loaned_To_User_ID,
      Status,
    });

    await newBookUnit.save();
    res.status(201).json({ message: 'Book unit created successfully', newBookUnit });
  } catch (error) {
    console.error('Error creating book unit:', error);
    res.status(500).json({ message: 'Error creating book unit', error });
  }
});

app.post('/users', async (req, res) => {
  try {
    const {
      UID, UserName, contact_number, Email, password, role, profilePicture,
      bio, location, isOwner, Join_Date, notificationPreferences, status
    } = req.body;

    const newUser = new User({
      UID,
      UserName,
      contact_number,
      Email,
      password,
      role,
      profilePicture,
      bio,
      location,
      isOwner,
      Join_Date,
      notificationPreferences,
      status,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});
