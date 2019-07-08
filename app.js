const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./server/routes/index');
const loader = require('./server/loader/Loader');

const app = express()
app.use(cors())

// Mau mindahin ke variable heroku atau gitlab secret key
app.set('secretKey', 'nodeRestApi')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(morgan('combined'))

//Index
app.get('/', (req, res) => {
    res.status(200).send({
        code: "00",
        message: 'Welcome to My REST API SERVICES',
        author: 'DIAN SETIYADI',
        github: 'https://github.com/diyset/JWT-REST-API-NODEJS-HEROKU',
        documentAPI: req.get('host') + '/document',
        testHeroku: 'DEBUG'
    })
})
app.get('/document', (req, res) => {
    res.status(200).send({
        code: "00",
        message: 'Document Api Service',
        UrlNoJWT: [{
            itemproduct: req.get('host') + '/api/itemproduct/all',
            order: req.get('host') + '/api/orders/all',
            tipeItem: req.get('host') + '/api/Util/tipeitem/all',
            statusOrder: req.get('host') + '/api/Util/statusOrder/all',
        }]
    })
})

// Router 
router(app);
// Redis
loader;


app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    res.status(404).send
    next(err)
})

app.use((err, req, res, next) => {
    console.log('------------------------------------');
    console.log(err.message);
    console.log('------------------------------------');
    if (err.status === 404) {
        console.log('Path URL NOT FOUND!')
        res.status(404).json({
            code: 404,
            message: 'Path Not Found!'
        })
    } else if (err.status === 401) {
        res.status(401).json({
            code: 401,
            message: 'Tidak bisa akses harus ada izin atau otentikasi!'
        })
    } else {
        res.status(500).json({
            message: 'Something looks Wrong:(!!!)',
            error: err
        })
    }
})
module.exports = app