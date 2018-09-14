const express = require('express')
const router = express.Router()

const userController = require('../controller/api/user');

router.post('/register',userController.create)
router.post('/authenticate',userController.authenticate)
router.get('/all',userController.getAllUser)
module.exports = router