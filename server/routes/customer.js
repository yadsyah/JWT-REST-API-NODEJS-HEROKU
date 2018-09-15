const express = require('express')
const router = express.Router()
const customerController = require('../controller/api').Customer

router.post('/register',customerController.createCustomer)
router.get('/all',customerController.getAll)
router.get('/allRetrive',customerController.getAllRetrive)
router.get('/allUser',customerController.getAllUser)
module.exports = router