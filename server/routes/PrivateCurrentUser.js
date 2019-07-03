const currentUser = require('../controller/api').CurrentUser

module.exports = (app) => {
    app.get('/api/account/me', currentUser.getMeUser)
}