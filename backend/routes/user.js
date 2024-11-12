require('dotenv').config();

const express = require("express")
const jwt = require("jsonwebtoken");
const userRouter = express.Router()
const { signupSchema, signinSchema } = require("../Schemas/zodSchema");
const validateSchema = require('../middlewares/validation');
const authMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db"); // Import User and Account models// Validation middleware// Zod schema for validation

const { jwtSecret } = require('../config');



userRouter.post("/signup", validateSchema(signupSchema), async (req, res) => {
    const userData = req.validatedData; // This contains validated data from the request
  
    try {
      // Use the User model to check if a user with the same username already exists
      const existingUser = await User.findOne({ username: userData.username }); // Corrected this line
  
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }

  
      // Create a new user
      const newUser = await User.create({
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
  
      // Create an account for the user with a random initial balance
      const userId = newUser._id;
      await Account.create({
        userId,
        balance: Math.floor(1 + Math.random() * 10000), // Store balance as integer
      });
  
      // Generate a JWT token for the new user

      const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: "1h" });

      console.log('JWT Secret in Signup:', jwtSecret);
  
      res.status(201).json({
        message: "User created successfully",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });

  userRouter.post("/signin", validateSchema(signinSchema), async (req, res) => {
    const { username, password } = req.validatedData;
    console.log("Username:", username);  // Debugging log for username
    console.log("Password Entered:", password);  // Debugging log for password

    try {
        const dbUser = await User.findOne({ username });
        if (dbUser) {
        } else {
            console.log("No user found with that username.");
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await dbUser.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: dbUser._id }, jwtSecret, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Sign-In Error:", error);  // Log any errors encountered
        res.status(500).json({ message: "Error during login", error: error.message });
    }
});

  
  // User Update Route
  userRouter.put("/", authMiddleware, async (req, res) => {
    const { password, firstName, lastName } = req.body;
  
    if (password && password.length < 6) {
      return res.status(411).json({ message: "Password is too small" });
    }
  
    const userId = req.userId;
    const user = await User.findById(userId); // Use findById with the user ID
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
  
    await user.save();
    res.status(200).json({ message: "Updated successfully" });
  });

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const { filter } = req.query

    const query = filter
    ? {
        $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } },
        ],
        }
    : {};

    try {
        const users = await User.find(query).select("firstName lastName _id");
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
      }

})

module.exports = userRouter;


/** 
 * {
    "message": "User created successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzMzZTk0Y2QxOTJlMGZhNGRjNjUxOGIiLCJpYXQiOjE3MzE0NTUzMDksImV4cCI6MTczMTQ1ODkwOX0.vo1zbrBHj-uazlrLnLsf2A9Z2ZaYHiAxMfOmWBVYF5s"
}
 */