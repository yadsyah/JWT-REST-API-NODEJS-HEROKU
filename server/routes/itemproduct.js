const express = require('express')
const router = express.Router()

const itemProductController = require('../controller/api').ProductItem

router.post('/create',itemProductController.createProduct)
router.get('/all',itemProductController.getAll)
router.get('/allRetrive',itemProductController.getAllRetrive)
module.exports = router