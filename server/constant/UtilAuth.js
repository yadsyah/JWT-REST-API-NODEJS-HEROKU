const jwt = require('jsonwebtoken')
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

module.exports = {
    validateUser:validateUser
}