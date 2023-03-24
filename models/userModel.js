const { Schema, model } = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/, lowercase: true},
    password: {type: String, required: true, min: 5},
    createdAt: {type: Date, default: new Date() },
    verificationCode: {type: Number, required: true},
    status: {type: String, enum: ['active', 'passive', 'disabled'], default: 'passive'}
})

const userModel = model('user', userSchema)


module.exports = userModel