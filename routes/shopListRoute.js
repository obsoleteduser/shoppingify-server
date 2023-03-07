const { Router } = require("express");
const shopListController = require("../controllers/shopListController");


const shopListRoute = Router()

shopListRoute.post('/shoplist', shopListController.setList)


module.exports = shopListRoute