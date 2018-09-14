const Express =require('express')
const Router = Express.Router()
const statusOrderController = require('../controller/api/').StatusOrder
const tipeItemController = require('../controller/api').TipeItem

Router.get('/statusOrder/all',statusOrderController.getAll)
Router.get('/tipeItem/all',tipeItemController.getAll)
module.exports = Router