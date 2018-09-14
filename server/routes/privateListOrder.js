const express = require('express')
const router = express.Router()

const listOrderController = require('../controller/api').ListOrder

router.post('/postOrder',listOrderController.postOrder)

module.exports = router