const jwt = require('jsonwebtoken')
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            console.log('------------------------------------');
            console.log(err.name);
            console.log('------------------------------------');
            console.log('------------------------------------');
            console.log(err.status);
            console.log('------------------------------------');
            console.log('------------------------------------');
            console.log(err);
            console.log('------------------------------------');
            if (err) {
                if (err.message == 'TokenExpiredError') {
                    return res.status(401).send({
                        code: err.status,
                        error: true,
                        message: 'Token Expired!',
                    })
                } else if (err.name === 'JsonWebTokenError') {
                    res.status(401).send({
                        code: err.status,
                        error: true,
                        message: 'Harus melakukan Authorization terlebih dahulu!',
                    })
                } else if (err.message == 'jwt malformed') {
                    res.status(401).send({
                        code: err.status,
                        error: true,
                        message: 'Token Format ERROR!'
                    })
                } else {
                    res.json({
                        code: err.status,
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