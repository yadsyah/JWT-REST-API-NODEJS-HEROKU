const routes = [
    require('./user'),
    // require('./movies'),
    // require('./customer'),
    // require('./alamat'),
    // require('./Util'),
    // require('./itemproduct'),
    // require('./publicListOrder'),
    // require('./privateListOrder'),
    require('./PrivateCurrentUser'),
    require('./ChannelingRoute'),
    require('./ParamRoute'),
]
const router = (app) => {
    return routes.forEach((route) => {
        route(app)
    })
}

module.exports = router