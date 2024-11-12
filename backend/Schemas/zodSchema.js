// schemas/zodSchema.js
const { z } = require("zod");

// Signup schema (requires all fields)
const signupSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
});

// Signin schema (only requires username and password)
const signinSchema = z.object({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { signupSchema, signinSchema };
