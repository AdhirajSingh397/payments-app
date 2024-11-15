const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors")
const app = express()

app.use(cors({
    origin: 'http://localhost:5173' // Replace this with your frontend URL
}));
app.use(express.json())

app.use("/api/v1", mainRouter)

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });