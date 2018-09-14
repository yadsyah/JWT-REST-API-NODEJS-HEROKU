const Alamat = require('../../db/models').Alamat
const Customer = require('../../db/models').Customer
module.exports = {

    createAlamatByCustomerId(req, res) {

        return Customer
            .findOne({
                where: {
                    id: req.params.customerId
                }
            })
            .then((result) => {
                if (result.alamatId) {
                    Alamat
                        .update({
                            address: req.body.address,
                            kodepos: req.body.kodepos,
                            kota: req.body.kota,
                            negara: req.body.negara
                        }, {
                            where: {
                                id: result.alamatId
                            }
                        })
                        .then((alamat) => {
                            return res.status(202).send({
                                code: "00",
                                error: false,
                                message: 'Data Successfully updated!'
                            })

                        }).catch((error) => res.status(400).send(error))
                } else {
                    Alamat
                        .create({
                            address: req.body.address,
                            kodepos: req.body.kodepos,
                            kota: req.body.kota,
                            negara: req.body.negara
                        })
                        .then((alamatCreate) => {
                            Customer
                                .update({
                                    alamatId: alamatCreate.id
                                }, {
                                    where: {
                                        id: req.params.customerId
                                    }
                                })
                                .then((result) => {
                                    return res.status(200).send({
                                        code: "00",
                                        error: false,
                                        message: 'Alamat Successfully created!'
                                    })
                                }).catch((error) => res.status(400).send(error))
                        })
                }
            }).catch((error) => res.status(400).send(error))
    },
    getAll(req, res) {

        return Alamat
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
                    code: 91,
                    error: true,
                    message: 'Data Not Found'
                })
            }).catch((error) => res.status(400).send(error))
    }
}