const express = require('express')
const router = express.Router()
const userController = require('../controller/api/user');
const UtilAuth = require('../constant/UtilAuth')

router.post('/auth/register', userController.create)
router.post('/auth/authenticate', userController.authenticate)
router.get('/user/:username', userController.getUserByUsername)
router.get('/user/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
router.get('/user/checkEmailAvailability/:email', userController.checkEmailAvailability)
router.get('/users/all', UtilAuth.validateUser, userController.getAllUser)

module.exports = router