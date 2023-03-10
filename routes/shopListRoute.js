const { Router } = require("express");
const shopListController = require("../controllers/shopListController");


const shopListRoute = Router()

shopListRoute.post('/shoplist', shopListController.setList)
shopListRoute.get('/shopList', shopListController.getLists)
shopListRoute.get('/shoplist', shopListController.getWaitingList)


module.exports = shopListRoute