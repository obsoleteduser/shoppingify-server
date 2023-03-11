require('dotenv').config()
const express = require('express')
const cors  = require('cors')
const connectDb = require('./config/db_config')
const { PORT } = require('./config/env')
const userRouter = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const authenticateToken = require('./middleware/authenticateToken')
const shopListRoute = require('./routes/shopListRoute')
const start = require('./services/starter')
const { default: helmet } = require('helmet')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.options('/user/shoplist', cors(), (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
  });
app.use(express.json())
app.use('/auth', userRouter)
app.use('/user', authenticateToken, productRoute)
app.use('/user', authenticateToken, shopListRoute)

start(app)