const connectDb = require("../config/db_config")
const { productModel } = require("../models/productModel")
const userModel = require("../models/userModel")

class ProductController{

    getProducts = async (req, res) =>{
        const user = req.user
        
       const products = await productModel.find({addedBy: user.id})
        res.status(200).json([...products])
    }

    addProduct = async (req, res)=>{
        const user = req.user
        const post = await productModel.create({...req.body, addedBy: user.id})
        res.send(post)
    }

    deleteProduct = (req, res)=>{

    }

}

module.exports = new ProductController() 

