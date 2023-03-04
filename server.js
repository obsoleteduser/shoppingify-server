require('dotenv').config()
const express = require('express')
const cors  = require('cors')
const connectDb = require('./config/db_config')
const { PORT } = require('./config/env')

const app = express()


app.use(cors())
app.use(express.json())

const start = async () => {
    await connectDb()
    app.listen(PORT, ()=>{console.log("Server started on " + PORT)})
}

start()