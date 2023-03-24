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

        try {
            const user = req.user
            const shopLists = await shopListModel
                .find({ createdBy: user, status: 'completed' })
                .populate('products.product', 'name')
            const productMap = new Map()

            shopLists.forEach((list) => {
                list.products.forEach((product) => {
                    if (productMap.has(product.product._id)) {
                        productMap.set(product.product._id, productMap.get(product.product._id) + product.quantity)
                    } else {
                        productMap.set(product.product._id, product.quantity)
                    }
                })
            })

            let maxQuantity = 0
            let maxProduct = null
            for (const [productId, quantity] of productMap.entries()) {
                if (quantity > maxQuantity) {
                    maxQuantity = quantity
                    maxProduct = productId
                }
            }

            const product = await productModel.findById(maxProduct)
            res.json({
                productName: product.name,
                quantity: maxQuantity
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal server error' })
        }


    }

}

module.exports = new ShopListController()