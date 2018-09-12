const express = require('express')
const router = express.Router()
const alamatController = require('../controller/api').Alamat

router.post('/createAlamat/:customerId',alamatController.createAlamatByCustomerId)
router.get('/all',alamatController.getAll)
module.exports = router