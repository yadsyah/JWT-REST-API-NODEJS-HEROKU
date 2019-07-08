const routes = [
    // require('./ChannelingRoute'),
    require('./UserRoute'),
    require('./ParamRoute'),
    require('./GroupRouter')
];

const router = (app) => {
    return routes.forEach((route) => {
        route(app)
    })
};

module.exports = router;