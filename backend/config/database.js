const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Eommerce")
  .then((data) => {
    console.log(`Connected to MongoDB on Port ${data.connection.port}`);
  })