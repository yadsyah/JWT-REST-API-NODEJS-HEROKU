const controller = require('../controller/api/ControllerGroup');
const authJwt = require('../utils/verifyJwtToken');

module.exports = (app) => {
    app.post('/api/group', controller.createGroup);
    app.get('/api/group', [authJwt.verifyToken], controller.findAll);
    app.get('/api/group/:groupId', [authJwt.verifyToken], controller.findByGroupId);
    app.put('/api/group/:groupId', [authJwt.verifyToken], controller.update);
    app.delete('/api/group/:groupId', [authJwt.verifyToken], controller.delete);
};