require('dotenv').config()
const express = require('express')
const cors  = require('cors')
const connectDb = require('./config/db_config')
const { PORT } = require('./config/env')
const userRouter = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const authenticateToken = require('./middleware/authenticateToken')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)
app.use('/user', authenticateToken, productRoute)

const start = async () => {
    await connectDb()
    app.listen(PORT, ()=>{console.log("Server started on " + PORT)})
}

start()