const shopListModel = require("../models/shopListModel")

class ShopListController{

    setList = async (req, res) =>{
        const user = req.user
        const { name, products, status } = req.body
        const shopList = await shopListModel.create({name, products, status, createdBy: user.id})
        res.send(shopList)
    }
    getWaitingList = async (req, res) =>{
        const user = req.user
        const list = await shopListModel.findOne({status: 'waiting', createdBy: user.id}).sort({ _id : -1 }).populate('products.product')
        res.status(200).json(list)
    }
    getLists = async (req, res) =>{
        const user = req.user
        const shopLists = await shopListModel.find({createdBy: user.id})
        res.status(200).json({lists: shopLists})
    }

    updateWaitingList = async (req, res) =>{
        const user = req.user
        const updatedList = req.body
        console.log(updatedList)
        const shopList = await shopListModel.findOneAndUpdate({status: "waiting", createdBy: user.id}, updatedList)
        res.status(200).json({message: "success"})
    }

}

module.exports = new ShopListController()