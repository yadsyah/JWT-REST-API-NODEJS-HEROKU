const statusOrderController = require('../controller/api/').StatusOrder
const tipeItemController = require('../controller/api').TipeItem

module.exports = (app) => {
    app.get('/api/statusOrder/all', statusOrderController.getAll)
    app.get('/api/tipeItem/all', tipeItemController.getAll)
}