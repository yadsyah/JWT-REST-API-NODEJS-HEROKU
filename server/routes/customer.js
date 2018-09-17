const express = require('express')
const router = express.Router()
const customerController = require('../controller/api').Customer
const UtilAuth = require('../constant/UtilAuth')

// User Staff
router.post('/register', UtilAuth.validateUser, customerController.createCustomer)
router.get('/all', UtilAuth.validateUser, customerController.getAll)
router.get('/allRetrive', UtilAuth.validateUser, customerController.getAllRetrive)
module.exports = router