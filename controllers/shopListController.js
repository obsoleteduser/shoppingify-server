const { productModel }  = require("../models/productModel")
const shopListModel = require("../models/shopListModel")

class ShopListController {

    setList = async (req, res) => {
        const user = req.user
        const { name, products, status } = req.body
        const shopList = await shopListModel.create({ name, products, status, createdBy: user.id })
        res.send(shopList)
    }
    getWaitingList = async (req, res) => {
        const user = req.user
        const list = await shopListModel.findOne({ status: 'waiting', createdBy: user.id }).sort({ _id: -1 }).populate('products.product')
        res.status(200).json(list)
    }
    getLists = async (req, res) => {
        const user = req.user
        const shopLists = await shopListModel.find({ createdBy: user.id }).populate('products.product')
        console.log(shopLists)
        res.status(200).json({ lists: shopLists })
    }

    getList = async (req, res) => {
        const { id } = req.body
        const shopList = await shopListModel.findById(id).populate('products.product', 'name')
        res.status(200).json(shopList)
    }

    updateWaitingList = async (req, res) => {
        const user = req.user
        const { name, products, status, createdAt, createdBy } = req.body
        console.log(req.body)
        const shopList = await shopListModel.findOneAndUpdate({ status: "waiting", createdBy: user.id }, { name, products, status, createdAt, createdBy })
        res.status(200).json({ message: shopList })
    }

    getPopularOne = async (req, res) => {

       
      try {
        const shopLists = await shopListModel.find({ createdBy: req.user.id, status: 'completed' }).populate('products.product');
      
        const productQuantityMap = new Map();
      
        shopLists.forEach((shopList) => {
          shopList.products.forEach((product) => {
            console.log("What I need: ", product);
            const productDoc = product.product;
            if (productDoc && productDoc._id) {
              const productId = productDoc._id;
              const quantity = product.quantity;
      
              if (!productQuantityMap.has(productId)) {
                productQuantityMap.set(productId, quantity);
              } else {
                const currentQuantity = productQuantityMap.get(productId);
                productQuantityMap.set(productId, currentQuantity + quantity);
              }
            }
          });
        });
      
        let mostPopularProduct = null;
        let mostPopularProductQuantity = 0;
      
        for (const [productId, quantity] of productQuantityMap) {
          if (quantity > mostPopularProductQuantity) {
            mostPopularProductQuantity = quantity;
            mostPopularProduct = productId;
          }
        }
      
        // Find the most popular product by ID and retrieve its name from the shopList object
        const mostPopularProductDoc = shopLists.find((shopList) => shopList.products.some((product) => product.product && product.product._id && product.product._id.toString() === mostPopularProduct.toString()));
        const mostPopularProductName = mostPopularProductDoc.products.find((product) => product.product && product.product._id && product.product._id.toString() === mostPopularProduct.toString()).product.name;
      
        res.json({
          productName: mostPopularProductName,
          totalQuantity: mostPopularProductQuantity
        });
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      

    }

    getFullStatistics = async (req, res) => {

      try {
        const shopLists = await shopListModel.find({ createdBy: req.user.id, status: 'completed' }).populate('products.product');
      
        const productQuantityMap = new Map();
      
        shopLists.forEach((shopList) => {
          shopList.products.forEach((product) => {
            console.log("What I need: ", product);
            const productDoc = product.product;
            if (productDoc && productDoc._id) {
              const productId = productDoc._id;
              const quantity = product.quantity;
      
              if (!productQuantityMap.has(productId)) {
                productQuantityMap.set(productId, quantity);
              } else {
                const currentQuantity = productQuantityMap.get(productId);
                productQuantityMap.set(productId, currentQuantity + quantity);
              }
            }
          });
        });
      
        const productQuantityArray = [];
      
        for (const [productId, quantity] of productQuantityMap) {
          const productDoc = await productModel.findById(productId);
          const productName = productDoc.name;
          const productQuantity = quantity;
          productQuantityArray.push({ product: productName, quantity: productQuantity });
        }
      
        res.json({
          productQuantity: productQuantityArray
        });
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      


    }


    getProductsPercentage = async (req, res) => {

      try {
        const shopLists = await shopListModel.find({ createdBy: req.user.id, status: 'completed' }).populate('products.product');
      
        const productQuantityMap = new Map();
        let totalQuantity = 0;
      
        shopLists.forEach((shopList) => {
          shopList.products.forEach((product) => {
            console.log("What I need: ", product);
            const productDoc = product.product;
            if (productDoc && productDoc._id) {
              const productId = productDoc._id;
              const quantity = product.quantity;
      
              if (!productQuantityMap.has(productId)) {
                productQuantityMap.set(productId, quantity);
              } else {
                const currentQuantity = productQuantityMap.get(productId);
                productQuantityMap.set(productId, currentQuantity + quantity);
              }
              totalQuantity += quantity;
            }
          });
        });
      
        const productPercentageArray = [];
      
        for (const [productId, quantity] of productQuantityMap) {
          const productDoc = await productModel.findById(productId);
          const productName = productDoc.name;
          const productPercentage = (quantity / totalQuantity) * 100;
          productPercentageArray.push({ product: productName, percentage: productPercentage.toFixed(2) });
        }
      
        res.json({
          productPercentage: productPercentageArray
        });
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      

    }

}

module.exports = new ShopListController()