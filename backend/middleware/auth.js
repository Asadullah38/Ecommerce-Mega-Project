const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { jwtToken } = await req.cookies;
  if (!jwtToken) {
    return next(new ErrorHandler("Please Login to access this resource.", 401));
  }
  const decodedData = jwt.verify(jwtToken, "asdasfsjhdfasdfjasdjfsdf");
  req.user = await User.findById(decodedData.id);
  next();
});

//Role check Pass
exports.userRoleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(
        new ErrorHandler(
          `You as a ${req.user.role} cannot access this page`,
          403
        )
      );
    }
  };
};
