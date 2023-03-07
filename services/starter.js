const connectDb = require("../config/db_config")
const { PORT } = require("../config/env")


const start = async (app) => {
    await connectDb()
    app.listen(PORT, ()=>{console.log("Server started on " + PORT)})
}

module.exports = start