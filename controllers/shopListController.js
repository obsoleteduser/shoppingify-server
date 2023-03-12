const shopListModel = require("../models/shopListModel")

class ShopListController{

    // setList = async (req, res) =>{
    //     const user = req.user
    //     const { name, products, status } = req.body
    //     const shopList = await shopListModel.create({name, products, status, createdBy: user.id})
    //     res.send(shopList)
    // }

    setList = async (req, res) => {
        const user = req.user;
        const { name, products, status } = req.body;
      
        
        const populatedProducts = await Promise.all(products.map(async (p) => {
          const populatedProduct = await p.product.populate('product').execPopulate();
          return {
            product: populatedProduct,
            quantity: p.quantity,
            bought: p.bought,
          };
        }));
      
       
        const shopList = await shopListModel.create({ name, products: populatedProducts, status, createdBy: user.id });
        res.send(shopList);
      }
      

    getWaitingList = async (req, res) =>{
        const list = await shopListModel.findOne({status: 'waiting'}).populate('products.product')
        const populatedProducts = await shopListModel.create(list)
        res.status(200).json(populatedProducts)
    }
    getLists = async (req, res) =>{
        const user = req.user
        const shopLists = await shopListModel.find({createdBy: user.id}).populate('products.product')
        res.status(200).json(shopLists)
    }

}

module.exports = new ShopListController()