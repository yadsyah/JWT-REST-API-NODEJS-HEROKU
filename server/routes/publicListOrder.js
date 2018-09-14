const express = require('express')
const router = express.Router()

const listOrderController = require('../controller/api').ListOrder

router.get('/all',listOrderController.getAll)
router.get('/allRetrive',listOrderController.getAllRetrive)

module.exports = router