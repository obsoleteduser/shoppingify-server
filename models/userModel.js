const { Schema, model } = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date() }
})

const userModel = model('user', userSchema)


module.exports = userModel