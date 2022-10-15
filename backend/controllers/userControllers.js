const user = require("../model/userModel");
const resetTokenModel = require("../model/resetTokens");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const { sendPasswordResetEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const v2 = require("../config/cloudinary");


//==========Create a new User.====================
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const result = await v2.uploader.upload(req.body.avatar, { folder: 'avatars', width: 150, crop: "scale" });
  const { name, email, password } = req.body;
  const newUser = new user({ name, email, password, avatar: { publicID: result.public_id, url: result.url } });
  await newUser.save();
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

// =====================================================================
//=================== LOGOUT USER ======================================
// =====================================================================
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("jwtToken");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// =====================================================================
//=================Request Reset Email==================================
// =====================================================================
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

// =====================================================================
//===============Reset Password after clicking the link=================
// =====================================================================
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //decrypt token hash
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


//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const loggedInUser = await user.findById(req.user.id);
  if (!loggedInUser) {
    return next(new ErrorHandler("Not Signed In.", 400));

  }
  res.status(200).json({
    success: true,
    loggedInUser
  });
})


//Update Password if user Remembers and is Logged In.
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const loggedInUser = await user.findById(req.user.id).select("+password");
  const isPasswordMatched = await loggedInUser.comparePassword(req.body.oldPassword);


  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is Incorrect.", 400));
  }
  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHandler("Old password and new Password Should not be same.", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords Do not Match.", 400));
  }

  loggedInUser.password = req.body.newPassword;
  await loggedInUser.save();

  sendToken(loggedInUser, 200, req, res);
})


//Update profile if user is Logged In.
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const loggedInUser = await user.findById(req.user.id);

  const newData = {
    name: req.body.name,
  }
  if (!req.body.name) {
    return next(new ErrorHandler(`Enter New Name.`, 400));
  }
  const updatedUser = await user.findByIdAndUpdate(req.user.id, newData, { new: true, runValidators: true, useFindAndModify: false });

  res.status(200).json({
    success: true,
    message: "Name Updated successfully"
  });
})

//Get All users Data for Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const allUsers = await user.find();
  res.status(200).json({
    success: true,
    allUsers
  });
})


// =====================================================================
//Get Single User Details for Admin
// =====================================================================

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const findUser = await user.findById(req.params.id);
  if (!findUser) {
    return next(new ErrorHandler(`User Not Found with Id ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    findUser,
  });
});


// =====================================================================
//==========Remove a User.====================
// =====================================================================
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const findUser = await user.findById(req.params.id);
  if (!findUser) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  //Will Add cloudinary later.
  const deletedUser = await findUser.remove();
  res.status(201).json({
    success: true,
    deletedUser,
    message: "User Deleted Successfully"
  });
});

// =====================================================================
//Admin Updating role of User with the email.
// =====================================================================
exports.updateRole = catchAsyncErrors(async (req, res, next) => {



  if (!req.body.email || !req.body.role || req.body.name) {
    return next(new ErrorHandler(`Provide Complete Data.`, 400));
  }

  const foundUser = await user.findOne({ email: req.body.email });
  if (!foundUser) {
    return next(new ErrorHandler(`User Not Found.`, 400));
  }
  if (foundUser.role === req.body.role) {
    return next(new ErrorHandler(`User ${req.body.email} Already has ${req.body.role} Role.`, 400));
  }


  const newData = {
    role: req.body.role,
  }

  const updatedUser = await user.findOneAndUpdate({ email: req.body.email }, newData, { new: true, runValidators: true, useFindAndModify: false });

  res.status(200).json({
    success: true,
    message: `User ${req.body.email}'s role Successfully Updated to ${req.body.role}`
  });
})