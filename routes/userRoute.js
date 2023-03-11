const { Router } = require('express')
const userController = require('../controllers/userController')

const userRouter = new Router()

userRouter.post('/signup', userController.signUp)
userRouter.post('/signin', userController.signIn)
userRouter.post('/confirm', userController.userConfirm)
userRouter.delete('/delete', userController.deleteUser)
userRouter.get('/wakeup', userController.wakeUp)


module.exports = userRouter