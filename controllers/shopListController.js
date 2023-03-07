const shopListModel = require("../models/shopListModel")

class ShopListController{

    setList = async (req, res) =>{
        const user = req.user
        const { name, products } = req.body
        const shopList = await shopListModel.create({name, products, createdBy: user.id})
        res.send(shopList)
    }
    getOneList = (req, res) =>{

    }
    getLists = async (req, res) =>{
        const user = req.user
        const shopLists = await shopListModel.find({_id: user.id}).populate('products.product')
        res.status(200).json([...shopLists])
    }

}

module.exports = new ShopListController()