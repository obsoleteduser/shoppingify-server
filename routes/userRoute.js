const { Router } = require('express')
const userController = require('../controller/userController')

const userRouter = new Router()

userRouter.post('/signup', userController.signUp)
userRouter.post('/signin', userController.signIn)
userRouter.get('/signout', userController.signOut)

module.exports = userRouter