const Customer = require('../../db/models').Customer
const Alamat = require('../../db/models').Alamat
const User = require('../../db/models').User
module.exports = {

    getAll(req, res) {
        return Customer
            .findAll()
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                }
                return res.status(400).send({
                    code: 92,
                    error: true,
                    message: 'Data Not Found'
                })
            }).catch((error) => res.status(400).send(error))
    },
    createCustomer(req, res) {
        payload = {
            customername: req.body.customername,
            nohp: req.body.nohp,
            email: req.body.email,
            tanggal_lahir: req.body.tanggallahir,
            noktp: req.body.noktp,
            createdBy: req.body.kodeKaryawan
        }
        return Customer
            .findOne({
                where: {
                    noktp: payload.noktp
                }
            })
            .then((result) => {
                if (result) {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Customer Existing!!'
                    })
                }
                Customer
                    .create(payload)
                    .then((result) => {
                        return res.status(201).send({
                            code: "00",
                            error: false,
                            message: 'Data Successfully create!'
                        })
                    }).catch((error) => res.status(400).send(error))
            })
    },
    getAllRetrive(req, res) {
        return Customer
            .findAll({
                include: {
                    model: Alamat,
                    as: 'alamats'
                }
            })
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                }
                return res.status(400).send({
                    code: 90,
                    error: true,
                    message: 'Data Not Found!'
                })
            }).catch((error) => res.status(400).send(error))
    },
    getAllUser(req, res) {
        if (req.body.isSuperUser) {

            return User.
            findAll()
                .then((users) => {
                    if (result.length > 0) {
                        res.status(200).send({
                            code: '00',
                            error: false,
                            message: 'success',
                            data: users
                        })
                    } else {
                        return res.status(400).send({
                            code: 90,
                            error: true,
                            message: 'Data Not Found!'
                        })
                    }
                }).catch((error) => res.status(400).send(error))
        }
        return res.status(400).send({
            code: 02,
            error: true,
            message: 'User Not Authorization/Previledge For This Request!'
        })
    },
    checkUsernameAvailability(req, res) {

        return User
            .findOne({
                where: {
                    username: req.params.username
                }
            })
            .then((result) => {
                console.log(result)
                if (!result) {
                    return res.status(200).send({
                        available: true,
                    })
                } else {
                    return res.status(200).send({
                        available: false,
                    })
                }
            })
    }
}