const mongoose = require("mongoose");
const validator = require("validator");

const tokenSchema= mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter an email."],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email."],
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 36000 }

});
module.exports = mongoose.model("tokens", tokenSchema);
