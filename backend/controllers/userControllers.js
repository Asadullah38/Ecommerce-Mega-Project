const user = require("../model/userModel");
const resetTokenModel = require("../model/resetTokens");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const { sendPasswordResetEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

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
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});


//=================Request Reset Email====================
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //Find Email Address
  const foundUser = await user.findOne({ email: req.body.email });
  //Wrong Email Address
  if (!foundUser) {
    return next(new ErrorHandler("User Not Found."));
  }

  //Creating URL and Message for Reset Password
  let resetToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
  const message = `Your Password Reset Token is :- \n\n${resetPasswordUrl}. If you have not requested this email kindly ignore this email.`;

  //Storing Hashed token in database
  const tokenToStore = crypto.createHash("sha256").update(resetToken).digest("hex");
  await resetTokenModel.create({
    email: req.body.email, token: tokenToStore
  })
  //Sending email to reset password
  try {
    await sendPasswordResetEmail({
      email: foundUser.email,
      subject: `Ecommerce Password Recovery`,
      message,
    })
    res.status(200).json({
      success: true,
      message: `Email sent to ${foundUser.email} successfully`,
    })
  } catch (error) {
    //If email not sent delete token from database
    await resetTokenModel.deleteOne({ email: req.body.email });
    return next(new ErrorHandler(error.message, 500));
  }
});


//===============Reset Password after clicking the link=================
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //descrypt token hash
  const token = crypto.createHash("sha256").update(req.params.token).digest("hex");

  //finding token from tokens list
  const foundToken = await resetTokenModel.findOne({ token });
  if (!foundToken) {
    return next(new ErrorHandler("Reset password token is invalid or expired.", 400))
  }

  //updating password
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords Do not Match.", 400));
  }
  //finding user to update
  const foundUser = await user.findOne({ email: foundToken.email });
  foundUser.password = req.body.password;
  await foundUser.save();
  await resetTokenModel.deleteOne({ token });
  //creating jwt token and storing it.
  sendToken(foundUser, 200, req, res);

})