const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Please Enter a Product Name."],
  },


  description: {
    type: "String",
    required: [true, "Please Enter a Product description."],
  },


  price: {
    type: "Number",
    required: [true, "Please Enter a Product price."],
    maxLength: [8, "Please Enter a price less than 8 digits."],
  },


  rating: {
    type: "Number",
    default: 0,
  },


  images: [
    {
      publicID: {
        type: "String",
        required: true,
      },
      url: {
        type: "String",
        required: true,
      },
    },
  ],

  
  category: {
    type: "String",
    required: [true, "Please Enter a Product category."],
  },

  
  stock: {
    type: "Number",
    required: [true, "Please Enter a Product stock."],
    maxLength: [4, "Stock cannot exceed 4 characters."],
    default: 1,
  },


  numOfReviews: {
    type: "Number",
    default: 0,
  },


  reviews: [
    {
      name: {
        type: "String",
        required: true,
      },
      rating: {
        type: "Number",
        required: true,
      },
      comment: {
        type: "String",
        required: true,
      },
    },
  ],

  
  createdAt: { type: "Date", default: Date.now() },
});


module.exports=mongoose.model("Product",productSchema);
