const TblParamController = require('../controller/api/ControllerParam');
// const UtilAuth = require('../constant/UtilAuth')

module.exports = (app) => {
    app.get('/api/param/all', TblParamController.getAll)
}