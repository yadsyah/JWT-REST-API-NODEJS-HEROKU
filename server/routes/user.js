const express = require('express')
const router = express.Router()

const userController = require('../controller/api/user');

router.post('/register',userController.create)
router.post('/authenticate',userController.authenticate)
router.get('/:username',userController.getUserByUsername)
router.get('/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
router.get('/checkEmailAvailability/:email', userController.checkEmailAvailability)
module.exports = router