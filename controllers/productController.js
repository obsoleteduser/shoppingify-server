const { productModel } = require("../models/productModel")


class ProductController{

    getProducts = async (req, res) =>{
        const user = req.user
        
       const products = await productModel.find({addedBy: user.id})
        res.status(200).json([...products])
    }

    setProduct = async (req, res)=>{
        const user = req.user
        const post = await productModel.create({...req.body, addedBy: user.id})
        res.send(post)
    }

    deleteProduct = async (req, res)=>{
        const { id } = req.body
        await productModel.deleteOne({_id: id})
        res.status(200).json({message: "deleted"})
    }

}

module.exports = new ProductController() 

