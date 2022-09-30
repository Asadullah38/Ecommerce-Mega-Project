const express = require('express');
const { newOrder, myOrders, getOrdersForAdmin, updateOrderStatus, getSingleOrder, deleteOrder } = require('../controllers/orderControllers');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, reviewProduct, getProductReviews, deleteReview } = require('../controllers/productControllers');
const { createUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, deleteUser, updateRole } = require('../controllers/userControllers');
const { isUserAuthenticated, userRoleCheck } = require('../middleware/auth');
const router = express.Router();

//Product Routes
router.route("/getProducts").get(getAllProducts);
router.put("/product/review", isUserAuthenticated, reviewProduct)
router.get("/reviews", getProductReviews)
router.put("/deleteReview", isUserAuthenticated, deleteReview);
router.post("/admin/createProduct", isUserAuthenticated, userRoleCheck("admin"), createProduct);
router.route("/product/:id").put(isUserAuthenticated, userRoleCheck("admin"), updateProduct).delete(isUserAuthenticated, userRoleCheck("admin"), deleteProduct).get(getSingleProduct);



//User Routes
router.route("/admin/getUsers").get(isUserAuthenticated, userRoleCheck("admin"), getAllUsers);
router.route("/admin/user/:id").get(isUserAuthenticated, userRoleCheck("admin"), getSingleUser).delete(isUserAuthenticated, userRoleCheck("admin"), deleteUser).put(isUserAuthenticated, userRoleCheck("admin"), updateRole);
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").put(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isUserAuthenticated, getUserDetails);
router.route("/password/update").put(isUserAuthenticated, updatePassword);
router.route("/me/updateProfile").put(isUserAuthenticated, updateProfile);



//Order Routes
router.route("/order/create").post(isUserAuthenticated,newOrder);
router.route("/order/myOrders/:id").get(isUserAuthenticated,myOrders);
router.route("/order/single/:id").get(isUserAuthenticated,getSingleOrder);
router.route("/Admin/allOrders").get(isUserAuthenticated,userRoleCheck("Admin"),getOrdersForAdmin);
router.route("/Admin/updateOrderStatus/:id").put(isUserAuthenticated,userRoleCheck("Admin"),updateOrderStatus);
router.route("/Admin/deleteOrder/:id").delete(isUserAuthenticated,userRoleCheck("Admin"),deleteOrder);

module.exports = router;