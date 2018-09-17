const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
var jwt = require('jsonwebtoken')
const UtilAuth = require('./server/constant/UtilAuth')

const app = express()
app.use(cors())
app.set('secretKey', 'nodeRestApi')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(morgan('combined'))

//Index
app.get('/', (req, res) => {
    res.status(200).send({
        code:"00",
        message:'Welcome to My REST API SERVICES',
        author:'DIAN SETIYADI'
    })
})
//Routes Import
const users = require('./server/routes/user')
const movies = require('./server/routes/movies')
const customer = require('./server/routes/customer')
const alamat = require('./server/routes/alamat')
const Util = require('./server/routes/Util')
const ItemProduct = require('./server/routes/itemproduct')
const PublicListOrder = require('./server/routes/publicListOrder')
const PrivateListOrder = require('./server/routes/privateListOrder')
const PrivateCurrentUser = require('./server/routes/PrivateCurrentUser')

//public route
app.use('/api', users)
app.use('/api/Util', Util)
app.use('/api/movies', movies)
app.use('/api/orders', PublicListOrder)
//private route
app.use('/api/customer', customer)
app.use('/api/alamat', UtilAuth.validateUser, alamat)
app.use('/api/itemproduct', ItemProduct)
app.use('/api/orders', UtilAuth.validateUser, PrivateListOrder)
app.use('/api/account', UtilAuth.validateUser, PrivateCurrentUser)


app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    res.status(404).send
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err.message)
    if (err.status === 404) {
        console.log('Path URL NOT FOUND!')
        res.status(404).json({
            code:404,
            message: 'Path Not Found!'
        })
    } else {
        res.status(500).json({
            message: 'Something looks Wrong:(!!!)',
            error:err
        })
    }
})
module.exports = app