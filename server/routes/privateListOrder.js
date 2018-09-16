const express = require('express')
const router = express.Router()
const listOrderController = require('../controller/api').ListOrder

router.post('/postOrder',listOrderController.postOrder)
router.post('/updateOrder/:orderId',listOrderController.updateStatusOrder)
module.exports = router