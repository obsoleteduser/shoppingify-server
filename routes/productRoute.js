const { Router } = require("express");
const productController = require("../controllers/productController");


const productRoute = Router()

productRoute.get('/products', productController.getProducts)
productRoute.post('/products', productController.setProduct)
productRoute.post('/products', productController.deleteProduct)

module.exports = productRoute