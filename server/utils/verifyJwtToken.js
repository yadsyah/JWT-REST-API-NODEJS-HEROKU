const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token){
        return res.status(403).send({
            code: 99,
            error: true,
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if (err){
            if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
                return res.status(401).send({
                    code: 99,
                    error: true,
                    message: 'Token Expired!'
                })
            } else if (err.name === 'JsonWebTokenError' && err.message === 'jwt must be provided') {
                res.status(401).send({
                    code: 99,
                    error: true,
                    message: 'Harus melakukan Authorization terlebih dahulu!'
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
        }
        req.userId = decoded.id;
        next();
    })
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;