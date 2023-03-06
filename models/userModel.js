const { Schema, model } = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date() },
    status: {type: String, enum: ['active', 'passive', 'disabled'], default: 'passive'}
})

const userModel = model('user', userSchema)


module.exports = userModel