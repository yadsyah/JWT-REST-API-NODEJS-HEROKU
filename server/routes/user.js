const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userController = require('../controller/api/user');
const UtilAuth = require('../constant/UtilAuth')

router.post('/register',userController.create)
router.post('/authenticate',userController.authenticate)
router.get('/:username',userController.getUserByUsername)
router.get('/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
router.get('/checkEmailAvailability/:email', userController.checkEmailAvailability)

//Validate JWT USER
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            if (err) {
                if (err.message == 'jwt expired') {
                    return res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'Token Expired!',
                    })
                } else if (err.message == 'jwt must be provided') {
                    res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'You Need Authorization First!',
                    })
                } else if (err.message == 'jwt malformed') {
                    res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'Token Format ERROR!'
                    })
                } else {
                    res.json({
                        code: 99,
                        error: true,
                        message: err.message,
                    })
                }
            } else {
                req.body.userId = decoded.id
                req.body.kodeKaryawan = decoded.kodeKaryawan
                req.body.isSuperUser = decoded.isSuperUser
                next()
            }
        })
}

module.exports = router