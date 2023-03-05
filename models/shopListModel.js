const { Schema, model } = require('mongoose')


const shopListSchema = Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
    status: {type: String, enum: ['canceled', 'completed']},
    createdAt: {type: Date, default: new Date()},
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'}
})

const shopListModel = model('shopList', shopListSchema)


module.exports = shopListModel
