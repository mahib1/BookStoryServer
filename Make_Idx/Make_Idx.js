const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UID : Number,
    User_Name: String,
    contact_number: String,
    Email: String,
    Book_Loaned: String,
    Deleted_User: Boolean
});

userSchema.index({ UID: 1 });
userSchema.index({ User_Name: 1, Email: 1 });
userSchema.index({ User_Name: 'text' });

const User = mongoose.model('User', userSchema);

const ownerSchema = new mongoose.Schema({
    OID : Number,
    Owner_Name: String,
    Contact_Number: String,
    Email: String,
    Books_Owned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

ownerSchema.index({ OID : 1 });
ownerSchema.index({ Owner_Name: 1, Email: 1 });
ownerSchema.index({ Email: 1 }, { unique: true });

const Owner = mongoose.model('Owner', ownerSchema);

const bookSchema = new mongoose.Schema({
    BID : Number,
    Book_Name: String,
    Book_Author: String,
    Owner_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
    Loaned_To_User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Status: String
});

bookSchema.index({ BID : 1 });
bookSchema.index({ Book_Name: 1, Book_Author: 1 });
bookSchema.index({ Status: 1 });
bookSchema.index({ Owner_ID: 1 });
bookSchema.index({ Loaned_To_User_ID: 1 });

const Book = mongoose.model('Book', bookSchema);

async function createIndexes() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Indexes created successfully!");


        const owner = new Owner({
            OID : 1,
            Owner_Name: "John Doe",
            Contact_Number: "123456789",
            Email: "john@example.com",
            Books_Owned: []
        });
        await owner.save();

        const book = new Book({
            BID : 1,
            Book_Name: "Book Title",
            Book_Author: "Author Name",
            Owner_ID: owner._id,
            Status: "Available"
        });
        await book.save();

        owner.Books_Owned.push(book._id);
        await owner.save();

        const user = new User({
            UID : 1,
            User_Name: "Jane Doe",
            contact_number: "987654321",
            Email: "jane@example.com",
            BookLoaned: book._id.toString(),
            Deleted_User: false
        });
        await user.save();

        book.Loaned_To_User_ID = user._id;
        await book.save();

        console.log("Data created and connections established!");
    } catch (error) {
        console.error("Error creating indexes and establishing connections:", error);
    } finally {
        mongoose.connection.close();
    }
}

createIndexes();
