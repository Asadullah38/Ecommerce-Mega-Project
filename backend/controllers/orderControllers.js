const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// ================================================
//============Create a new Order===================
// ================================================
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    //destructring data
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    //validating Data
    if (!shippingInfo || !orderItems || !paymentInfo || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
        return next(new ErrorHandler(`Enter Complete Details.`, 400));
    }

    //Creating Order
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), userID: req.user._id
    })

    //Sending Response
    res.status(201).json({
        success: true,
        order
    })
})




// ================================================
//============Get a single Order===================
// ================================================

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    //finding Order
    const order = await Order.findById(req.params.id);

    //Sending Response
    res.status(200).json({
        success: true,
        order
    })
})




// ================================================
//============Get User's Orders===================
// ================================================

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    //finding Order
    const myOrders = await Order.find({ userID: req.user.id })
    //Sending Response
    res.status(200).json({
        success: true,
        myOrders
    })
})



// ===================================================
//============Get All Orders--Admin===================
// ===================================================

exports.getOrdersForAdmin = catchAsyncErrors(async (req, res, next) => {
    //finding Orders
    const orders = await Order.find();

    //getting Total Amount
    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);


    //Sending Response
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})


// ===================================================
//============Updating Order Status --Admin===========
// ===================================================

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    //finding Order to Update Status
    const order = await Order.findById(req.params.id);
    if (!req.body.status) {
        return next(new ErrorHandler(`Enter Order Status to be Updated.`, 400))
    }
    if (!order) {
        return next(new ErrorHandler(`No Order with this ID.`, 400))
    }



    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler(`Product has Already been delivered.`, 400))
    }
    console.log(order.OrderStatus);
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity)
    })


    order.orderStatus = req.body.status;
    await order.save({ validateBeforeSave: false });

    //Sending Response
    res.status(201).json({
        success: true,
        order,

    })
})

//Update Stock Function
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}






// ===================================================
//============Delete Order--Admin===================
// ===================================================

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    //finding Orders
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order Not Found with this ID.`, 400));
    }
    await order.remove({ new: true });
    //Sending Response
    res.status(200).json({
        success: true,
        order,
    })
})
