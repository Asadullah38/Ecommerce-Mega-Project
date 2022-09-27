const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name."],
    maxLength: [30, "Name must be not be greater than 30 characters"],
    minLength: [4, "Name must be at least 4 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter an email."],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email."],
  },

  password: {
    type: String,
    required: [true, "Please Enter a password."],
    minLength: [8, "Password must be at least 8 characters."],
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },

  avatar: {
    publicID: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

userSchema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function (req, res, next) {
  return jwt.sign({ id: this._id }, "asdasfsjhdfasdfjasdjfsdf", {
    expiresIn: '10days'
  });
}
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("user", userSchema);
