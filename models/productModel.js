const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {type: String, required: true },
    note: {type: String},
    image: {type: String},
    category: {type: String},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

exports.productModel = model('product', productSchema)
