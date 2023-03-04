const { connect } = require('mongoose')
const { DB_URL } = require('./env')

const connectDb = async () =>{
    await connect(DB_URL)
    console.log('Connected to database')
}

module.exports = connectDb