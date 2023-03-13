const { Router } = require("express");
const shopListController = require("../controllers/shopListController");


const shopListRoute = Router()

shopListRoute.post('/shoplist', shopListController.setList)
shopListRoute.get('/shoplist', shopListController.getLists)
shopListRoute.get('/shoplistwaiting', shopListController.getWaitingList)
shopListRoute.put('/updatewaitinglist', shopListController.updateWaitingList)

module.exports = shopListRoute
