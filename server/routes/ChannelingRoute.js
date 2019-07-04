const channelingController = require('../controller/api').Channeling

module.exports = (app) => {
    app.get('/api/hargaemas', channelingController.getHargaEmas)
}