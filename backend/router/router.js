const express= require('express');
const { getAllProducts, createProduct,updateProduct ,deleteProduct, getSingleProduct} = require('../controllers/productControllers');
const router = express.Router();


router.get("/getProducts",getAllProducts);
router.post("/createProduct",createProduct);
router.route("/product/:id").put(updateProduct).get(getSingleProduct).delete(deleteProduct);
module.exports = router;
8