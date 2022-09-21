const dotenv = require("dotenv");
const express = require("express");
const app = express();
const router = require("./router/router");
require("./config/database");
const errorMiddleware = require("./middleware/Error");
const asyncMiddleware = require("./middleware/catchAsyncErrors");

//uncaughtException Error Handled
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to Uncaught Exception.`);
  server.close(() => {
    process.exit(1);
  });
});

//Error Middleware for Messages
app.use(express.json());
app.use(router);
dotenv.config({ path: "backend/config/config.env" });
app.use(errorMiddleware);
app.use(asyncMiddleware);

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down Server due to unhandledRejection.`);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(5000, () => {
  console.log("listening on port", 5000);
});
