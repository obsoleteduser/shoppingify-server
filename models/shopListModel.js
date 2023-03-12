const { Schema, model } = require('mongoose')


const shopListSchema = Schema({
    name: {type: String, required: true},
    products: [{product: {type: Schema.Types.ObjectId, ref: 'product'},
    quantity: Number,
    bought: Boolean
}],
    status: {type: String, enum: ['waiting','canceled', 'completed'], required: true},
    createdAt: {type: Date, default: new Date},
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'}
})

const shopListModel = model('shopList', shopListSchema)


module.exports = shopListModel
