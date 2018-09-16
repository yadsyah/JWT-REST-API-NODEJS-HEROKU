const express = require('express')
const router = express.Router()
const itemProductController = require('../controller/api').ProductItem
const UtilAuth = require('../constant/UtilAuth')

// private ROUTER
router.post('/create', UtilAuth.validateUser, itemProductController.createProduct)
router.post('/update', UtilAuth.validateUser, itemProductController.updateById)
// public ROUTER
router.get('/all', itemProductController.getAll)
router.get('/allRetrive', itemProductController.getAllRetrive)


module.exports = router