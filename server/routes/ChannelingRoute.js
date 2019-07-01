const express = require('express')
const router = express.Router()
const channelingController = require('../controller/api').Channeling


router.get('/hargaemas', channelingController.getHargaEmas)
module.exports = router