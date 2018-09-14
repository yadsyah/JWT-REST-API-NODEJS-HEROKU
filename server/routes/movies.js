const express = require('express')
const router = express.Router()
const movieController = require('../controller/api').Movie

router.get('/', movieController.getAll)
router.get('/:movieId', movieController.getById)
router.post('/create', movieController.create)
router.post('/update', movieController.updateById)
module.exports = router