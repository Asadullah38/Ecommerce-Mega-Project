const express= require('express');
const { getAllProducts, createProduct,updateProduct ,deleteProduct} = require('../controllers/productControllers');
const router = express.Router();


router.get("/getProducts",getAllProducts);
router.post("/createProduct",createProduct);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);
module.exports = router;
