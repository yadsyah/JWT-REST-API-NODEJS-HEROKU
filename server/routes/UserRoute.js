const controller = require('../controller/api/ControllerUser');
const verifySignUp = require('../utils/verifySignUp');
const authJwt = require('../utils/verifyJwtToken');

module.exports = (app) => {
    app.post('/api/auth/register', [verifySignUp.checkGroupAndDuplicateUserNameOrEmail], controller.signUp);
    app.post('/api/auth/login', controller.signIn);
    // app.get('/api/account/me', [authJwt.verifyToken], currentUser.getMeUser)
};

// module.exports = (app) => {
//     app.post('/api/auth/register', userController.create)
//     app.post('/api/auth/authenticate', userController.authenticate)
//     app.get('/api/user/:username', userController.getUserByUsername)
//     app.get('/api/user/get/:userid', userController.getUserById)
//     app.get('/api/user/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
//     app.get('/api/user/checkEmailAvailability/:email', userController.checkEmailAvailability)
//     app.get('/api/users/all', [UtilAuth.validateUser], userController.getAllUser)
//     app.get('/api/account/me', [UtilAuth.validateUser], currentUser.getMeUser)
// }
