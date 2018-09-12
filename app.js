const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const users = require('./server/routes/user')
const movies = require('./server/routes/movies')
var jwt = require('jsonwebtoken')
const User = require('./server/db/models').User

const app = express()
app.set('secretKey', 'nodeRestApi')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(logger('dev'))



app.get('/', (req, res) => {
    res.json({
        "Tutorial": "Rest API JWT"
    })
})


//public route
app.use('/users', users)
//private route
app.use('/movies', validateUser, movies)


function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        req.app.get('secretKey'), (err, decoded) => {
            if (err) {
                res.json({
                    code:99,
                    error:true,
                    message: err.message,
                })
            } else {
                req.body.userId = decoded.id
                next()
            }
        })
}

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    if (err.status === 404) {
        res.status(404).json({
            message: 'Not Found!'
        })
    } else {
        res.status(500).json({
            message: 'Something looks Wrong:(!!!)'
        })
    }
})
module.exports = app