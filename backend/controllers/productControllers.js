const product = require("../model/productModel");

//==========Get All Products====================

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await product.find();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(400).send(error);
  }
};

//==========Create a new Product.====================

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

//==========Update a Product.====================

exports.updateProduct = async (req, res) => {
  try {
    const findProduct = await product.findById(req.params.id);
    if (!findProduct) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

//==========Remove a Product.====================

exports.deleteProduct = async (req, res) => {
  try {
    const findProduct = await product.findById(req.params.id);
    if (!findProduct) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    await findProduct.remove();
    res.status(201).send(findProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};
