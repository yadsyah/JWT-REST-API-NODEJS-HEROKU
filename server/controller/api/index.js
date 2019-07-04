const User = require('./ControllerUser')
const Movie = require('./movies')
const Alamat = require('./alamat')
const Customer = require('./ControllerCustomer')
const StatusOrder = require('./statusorder')
const TipeItem = require('./tipeitem');
const ProductItem = require('./itemproduct')
const ListOrder = require('./OrderList')
const CurrentUser = require('./ControllerCurrentUser')
const Channeling = require('./ControllerChannelingPDS')
const GetTokenPDS = require('./AuthTokenChanneling')
const TblParamController = require('./ControllerParam')
module.exports = {
    User,
    Movie,
    Alamat,
    Customer,
    StatusOrder,
    TipeItem,
    ProductItem,
    ListOrder,
    CurrentUser,
    Channeling,
    GetTokenPDS: GetTokenPDS,
    TblParamController: TblParamController
}