const { productModel } = require("../models/productModel")
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
        res.status(200).json({ lists: shopLists })
    }

    getList = async (req, res) => {
        const { id } = req.body
        const shopList = await shopListModel.findById(id)
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

  
        //Dude

       
  try {
    const shopLists = await shopListModel.find({ createdBy: req.user.id, status: 'completed' }).populate('products.product');
    
    const productQuantityMap = new Map();
    
    shopLists.forEach((shopList) => {
      shopList.products.forEach((product) => {
        const productId = product.product._id;
        const quantity = product.quantity;
        
        if (!productQuantityMap.has(productId)) {
          productQuantityMap.set(productId, quantity);
        } else {
          const currentQuantity = productQuantityMap.get(productId);
          productQuantityMap.set(productId, currentQuantity + quantity);
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
    
    const mostPopularProductDetails = await productModel.findById(mostPopularProduct);
    
    res.json({
      productName: mostPopularProductDetails.name,
      totalQuantity: mostPopularProductQuantity
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }



        //Dude


    }

}

module.exports = new ShopListController()