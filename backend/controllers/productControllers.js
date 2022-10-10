const product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");




// =====================================================================
//============================Get All Products==========================
// =====================================================================
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const productCount = await product.countDocuments();
  const apiFeature = new apiFeatures(product.find(), req.query).search().filter().pagination(2);
  const allProducts = await apiFeature.query;
  const pageNo = Number(apiFeature.queryString.page);

  res.status(200).json({
    success: true,
    pageNo,
    allProducts,
    productCount,
  });
});


// =====================================================================
//==========Create a new Product.====================
// =====================================================================
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.creator = req.user.id;
  const newProduct = await product.create(req.body);
  res.status(201).json({
    success: true,
    newProduct,
  });
});


// =====================================================================
//==========Update a Product.====================
// =====================================================================
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const findProduct = await product.findById(req.params.id);
  if (!findProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const updatedProduct = await product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json({
    success: true,
    updatedProduct,
  });
});


// =====================================================================
//==========Remove a Product.====================
// =====================================================================
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const findProduct = await product.findById(req.params.id);
  if (!findProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  const deletedProduct = await findProduct.remove();
  res.status(201).json({
    success: true,
    deletedProduct,
  });
});


// =====================================================================
//Get Single Product Details
// =====================================================================
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const findProduct = await product.findById(req.params.id);
  if (!findProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    findProduct,
  });
});


// =====================================================================
//Creating Product Review
// =====================================================================
exports.reviewProduct = catchAsyncErrors(async (req, res, next) => {


  const { rating, comment, productId } = req.body;
  //Your review
  const review = {
    userID: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar.url,
    rating: Number(rating),
    comment
  }
  console.log(review.avatar);
  //finding the product
  const foundProduct = await product.findById(productId);

  //Error Handling
  if (!foundProduct) {
    return next(new ErrorHandler("Product Not Found.", 400))
  }
  if (!rating) {
    return next(new ErrorHandler(`Give a Rating Please.`));
  }

  //is Reviewed is false considering user has not already rated.
  let isReviewed = false;
  foundProduct.reviews.forEach(rev => {
    if (rev.userID.toString() === req.user.id) {
      isReviewed = true;
    }
  })

  //if first time rated by user
  if (!isReviewed) {
    foundProduct.reviews.push(review);
    foundProduct.numOfReviews = foundProduct.reviews.length;
  }

  //if already rated by user
  else {
    foundProduct.reviews.forEach(review => {
      if (review.userID.toString() === req.user.id) {
        review.rating = rating;
        review.comment = comment;
        review.avatar = req.user.avatar.url;
      }
    })
  }

  //Average of reviews
  let sumofReviews = 0;
  foundProduct.reviews.forEach(review => {
    sumofReviews += review.rating;
  })

  //Adding ratings and num of reviews
  foundProduct.ratings = sumofReviews / foundProduct.reviews.length;
  foundProduct.numOfReviews = foundProduct.reviews.length;
  //Saving Data
  console.log(foundProduct);
  await foundProduct.save();

  //sending response
  res.status(200).json({
    foundProduct,
    success: true,
  })
})


// =====================================================================
//===========================Get Product Review
// =====================================================================
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const foundProduct = await product.findById(req.query.id);
  if (!foundProduct) {
    return next(new ErrorHandler("No Product Found.", 400))
  }
  res.status(200).json({
    reviews: foundProduct.reviews,
    success: true,
  })
})


// =====================================================================
//======================Deleting Product Review
// =====================================================================
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query);
  const foundProduct = await product.findById(req.query.productId);
  if (!foundProduct) {
    return next(new ErrorHandler("No Product Found.", 400))
  }

  let currentReview = {};
  foundProduct.reviews.forEach(rev => {
    if (rev._id.toString() === req.query.id) {
      currentReview = rev;
    }
  })

  //checking for empty object
  if (Object.keys(currentReview).length === 0) {
    return next(new Error("Could not find this review."));
  }

  //If userID of review is not yours
  if (currentReview.userID.toString() !== req.user.id) {
    return next(new Error(`You cannot delete ${currentReview.name}'s Review.`));
  }


  //Remaining Reviews
  let reviews = [];
  foundProduct.reviews.forEach(rev => {
    if (rev._id.toString() !== req.query.id) {
      reviews.push(rev);
      console.log(rev);
    }
  })

  //Average of reviews
  let sumofReviews = 0;
  reviews.forEach(review => {
    sumofReviews += review.rating;
  })

  //defining numofReviews,reviews,ratings and save
  const numOfReviews = reviews.length;
  const ratings = sumofReviews / numOfReviews;
  console.log(ratings, numOfReviews, reviews);

  await product.findByIdAndUpdate(req.query.productId, { numOfReviews: numOfReviews, ratings: ratings, reviews: reviews }, { new: true, runValidators: true, useFindAndModify: false });

  //sending response
  res.status(200).json({
    reviews: foundProduct.reviews,
    success: true,
  })

})
