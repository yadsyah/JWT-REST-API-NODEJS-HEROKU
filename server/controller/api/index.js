const User = require('./user')
const Movie = require('./movies')
const Alamat = require('./alamat')
const Customer = require('./customer')
const StatusOrder = require('./statusorder')
const TipeItem = require('./tipeitem');
const ProductItem = require('./itemproduct')
const ListOrder = require('./OrderList')
const CurrentUser = require('./CurrentUser')
const Channeling = require('./ChannelingPDS')
const GetTokenPDS = require('./AuthTokenChanneling')
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
    GetTokenPDS: GetTokenPDS
}