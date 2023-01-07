const express = require("express");
const path = require('path')

if (process.env.NODE_ENV !== "PRODUCTION") {
  require('dotenv').config({ path: path.resolve(__dirname, './config/.env') })
}

const bodyParser = require("body-parser");
const app = express();
const router = require("./router/router");
const cookieParser = require("cookie-parser");
require("./config/database");
const cors = require("cors");
const errorMiddleware = require("./middleware/Error");

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//uncaughtException Error Handled
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to Uncaught Exception.`);
  server.close(() => {
    process.exit(1);
  });
});




app.use(router);
app.use(cors);
//Error Middleware for Messages

app.use(errorMiddleware);
//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to unhandledRejection.`);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(5000 || process.env.PORT, () => {
  console.log("listening on port");
});