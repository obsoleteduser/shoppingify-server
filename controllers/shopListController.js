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
        const shopLists = await shopListModel.find({createdBy: user.id}).populate('products.product')
        res.status(200).json({lists: shopLists})
    }

    updateWaitingList = async (req, res) =>{
        const user = req.user
        const { name, products, createdAt, createdBy } = req.body
        console.log(req.body)
        const shopList = await shopListModel.findOne({status: "waiting", createdBy: user.id}).sort({_id: -1}).update({ name, products, createdAt, createdBy })
        res.status(200).json({message: "success"})
    }

}

module.exports = new ShopListController()