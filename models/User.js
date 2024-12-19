const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UID: {
    type: Number,
    required: true,
    unique: true,
  },

  UserName: {
    type: String,
    required: true,
    unique: true,
  },

  contact_number: {
    type: String,
    required: true,
    unique: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },

  profilePicture: {
    type: String,
    required: false,
  },
  
  bio: {
    type: String,
    required: false,
  },

  location: {
    type: String,
    required: false,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    required: false,
  },

  tokenExpiry: {
    type: Date,
    required: false,
  },

  isOwner: {
    type: Boolean,
    required: true,
    default: true,
  },

  Books_Owned: [
    {
      type: Schema.Types.ObjectID,
      ref: "Books",
    },
  ],

  Books_Loaned: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Books',
    },
  ],

  Join_Date: {
    type: Date,
    required: false,
  },

  lastLogin: {
    type: Date,
    required: false,
  },

  notificationPreferences: {
    type: Object,
    default: {
      email: true,
      sms: false,
    },
  },

  status: {
    type: String,
    enum: ['active', 'banned', 'inactive', 'deleted'],
    default: 'active',
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
