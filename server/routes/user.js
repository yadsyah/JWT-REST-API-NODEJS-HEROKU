const userController = require('../controller/api/ControllerUser');
const UtilAuth = require('../constant/UtilAuth')

module.exports = (app) => {
    app.post('/api/auth/register', userController.create)
    app.post('/api/auth/authenticate', userController.authenticate)
    app.get('/api/user/:username', userController.getUserByUsername)
    app.get('/api/user/get/:userid', userController.getUserById)
    app.get('/api/user/checkUsernameAvailability/:username', userController.checkUsernameAvailability)
    app.get('/api/user/checkEmailAvailability/:email', userController.checkEmailAvailability)
    app.get('/api/users/all', UtilAuth.validateUser, userController.getAllUser)
}
