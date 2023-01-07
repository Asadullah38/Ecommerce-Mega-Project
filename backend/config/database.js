const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(process.env.DB)
  .then((data) => {
    console.log(`Connected to MongoDB on Port ${data.connection.port}`);
  })