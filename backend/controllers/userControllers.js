const user = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");

//==========Create a new User.====================
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const newUser = await user.create(req.body);
  sendToken(newUser, 200, req, res);
});

// ===================Login User=====================
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter a valid email and password"));
  }

  const foundUser = await user.findOne({ email }).select("+password");
  if (!foundUser) {
    return next(new ErrorHandler("Invalid Email or password"));
  }

  const compareResult = await foundUser.comparePassword(password);
  if (!compareResult) {
    return next(new ErrorHandler("Invalid Email or password"));
  }

  sendToken(foundUser, 200, req, res);
});

//=================== LOGOUT USER ==========================

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("jwtToken");
  console.log(req.cookies);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

