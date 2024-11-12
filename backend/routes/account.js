const express = require('express');
const mongoose = require('mongoose');
const { Account } = require('../db');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get balance route
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving balance", error: error.message });
  }
});

// Transfer route
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
  
    try {
      await session.withTransaction(async () => {
        const { amount, to } = req.body;
  
        // Validate and parse amount
        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
          throw new Error("Invalid transfer amount");
        }
  
        // Validate 'to' user ID
        if (!mongoose.Types.ObjectId.isValid(to)) {
          throw new Error("Invalid recipient account");
        }
  
        // Fetch the sender's account within the transaction
        const account = await Account.findOne({ userId: req.userId }, null, { session });
        if (!account || account.balance < transferAmount) {
          throw new Error("Insufficient balance");
        }
  
        // Fetch the recipient's account within the transaction
        const toAccount = await Account.findOne({ userId: to }, null, { session });
        if (!toAccount) {
          throw new Error("Recipient account not found");
        }
  
        // Perform the transfer
        account.balance -= transferAmount;
        toAccount.balance += transferAmount;
  
        await account.save({ session });
        await toAccount.save({ session });
      });
  
      res.json({ message: "Transfer successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    } finally {
      session.endSession();
    }
  });
  

module.exports = router;
