const express = require('express')
const router = express.Router()
const movieController = require('../controller/api').Movie
const UtilAuth = require('../constant/UtilAuth')
router.get('/', movieController.getAll)
router.get('/:movieId', movieController.getById)
router.post('/create', UtilAuth.validateUser, movieController.create)
router.post('/update', UtilAuth.validateUser, movieController.updateById)
module.exports = router