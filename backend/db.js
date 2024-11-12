// backend/db.js
const mongoose = require('mongoose');
const { config } = require('dotenv');
const bcrypt = require("bcrypt");

config();

const uri = process.env.DB_URI

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error.message));

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0, // Default balance is 0
    },
  });
  
  // Create Account model
  const Account = mongoose.model("Account", accountSchema);

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Validate password
  userSchema.methods.validatePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
  // Create and export User model
  const User = mongoose.model("User", userSchema);
  
  module.exports = { User, Account };