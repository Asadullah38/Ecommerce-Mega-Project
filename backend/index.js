const dotenv = require("dotenv");
const express = require("express");
const app = express();
const router = require("./router/router");
require("./config/database");

app.use(express.json());
app.use(router);
dotenv.config({ path: "backend/config/config.env" });

app.listen(5000, () => {
  console.log("listening on port", 5000);
});
