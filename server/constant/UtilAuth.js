const jwt = require('jsonwebtoken')

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            // console.log('------------------------------------');
            // console.log(err.name);
            // console.log('------------------------------------');
            // console.log('------------------------------------');
            // console.log(err.status);
            // console.log('------------------------------------');
            // console.log('------------------------------------');
            // console.log(err);
            // console.log('------------------------------------');
            if (err) {
                if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
                    return res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'Token Expired!',
                    })
                } else if (err.name === 'JsonWebTokenError' && err.message === 'jwt must be provided') {
                    res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'Harus melakukan Authorization terlebih dahulu!',
                    })
                } else if (err.name === 'JsonWebTokenError' && err.message === 'jwt malformed') {
                    res.status(401).send({
                        code: 99,
                        error: true,
                        message: 'Token Format ERROR!'
                    })
                } else if (err.name === 'JsonWebTokenError' && err.message === 'invalid token') {
                    res.status(401).send({
                        code: 99,
                        error: true,
                        message: err.message
                    })
                } else {
                    res.json({
                        code: 99,
                        error: true,
                        message: err.name + ' - ' + err.message,
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
    validateUser: validateUser
}