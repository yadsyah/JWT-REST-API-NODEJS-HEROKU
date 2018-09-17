const express = require('express')
const router = express.Router()
const userController = require('../controller/api/user');
const UtilAuth = require('../constant/UtilAuth')

router.post('/register', userController.create)
router.post('/authenticate', userController.authenticate)
router.get('/:username', userController.getUserByUsername)
router.get('/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
router.get('/checkEmailAvailability/:email', userController.checkEmailAvailability)
router.get('/all', UtilAuth.validateUser, userController.getAllUser)
router.get('/allAnother',userController.getAll)

module.exports = router