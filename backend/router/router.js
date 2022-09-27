const express= require('express');
const { getAllProducts, createProduct,updateProduct ,deleteProduct, getSingleProduct} = require('../controllers/productControllers');
const { createUser, loginUser,logout, forgotPassword, resetPassword } = require('../controllers/userControllers');
const { isUserAuthenticated,userRoleCheck } = require('../middleware/auth');
const router = express.Router();

//Product Routes
router.route("/getProducts").get(getAllProducts);
router.post("/createProduct",isUserAuthenticated,userRoleCheck("admin"),createProduct);
router.route("/product/:id").put(isUserAuthenticated,userRoleCheck("admin"),updateProduct).get(getSingleProduct).delete(isUserAuthenticated,userRoleCheck("admin"),deleteProduct);


//User Routes
router.post("/createUser",createUser);
router.post("/loginUser",loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").put(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;