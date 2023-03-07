const shopListModel = require("../models/shopListModel")

class ShopListController{

    setList = (req, res) =>{
        const user = req.user
        const { name, products } = req.body
        const shopList = shopListModel.create({name, products, createdBy: user.id})
        res.send(shopList)
    }
    getOneList = (req, res) =>{

    }
    getLists = (req, res) =>{

    }

}

module.exports = new ShopListController()