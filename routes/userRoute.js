const { Router } = require('express')
const userController = require('../controllers/userController')

const userRouter = new Router()

userRouter.post('/signup', userController.signUp)
userRouter.post('/signin', userController.signIn)
userRouter.delete('/delete', userController.deleteUser)


module.exports = userRouter