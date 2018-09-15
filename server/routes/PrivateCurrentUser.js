const express = require('express')
const router = express.Router()

const currentUser = require('../controller/api').CurrentUser

router.get('/me',currentUser.getMeUser)

module.exports = router