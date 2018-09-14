const Customer = require('../../db/models').Customer
const Alamat = require('../../db/models').Alamat
module.exports = {

    getAll(req, res) {

        return Customer
            .findAll()
            .then((result) => {
                if (result) {
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
                            message: 'Data Successfully create'
                        })
                    }).catch((error) => res.status(400))
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
                if (result) {
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
    }
}