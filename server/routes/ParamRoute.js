const controller = require('../controller/api/ControllerParam');
const authJwt = require('../utils/verifyJwtToken');
const verifySignUp = require('../utils/verifySignUp');

module.exports = (app) => {
    app.post('/api/param', [authJwt.verifyToken], controller.create);
    app.get('/api/param', [authJwt.verifyToken, verifySignUp.isAdmin], controller.findAll);
    app.get('/api/param/:key_', [authJwt.verifyToken], controller.findByKey);
    app.put('/api/param/:key_', [authJwt.verifyToken], controller.update);
    app.delete('/api/param/:key_', [authJwt.verifyToken], controller.delete);
};