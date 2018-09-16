const ItemProduct = require('../../db/models').item_product
const TipeItem = require('../../db/models').TipeItem

module.exports = {

    createProduct(req, res) {

        payload = {
            namaproduct: req.body.namaproduct,
            tipe_item: req.body.tipeitem,
            harga: req.body.harga,
            stock: req.body.stock,
            createdBy: req.body.kodeKaryawan
        }


        if (!payload.namaproduct) {
            return res.status(200).send({
                code: 99,
                error: true,
                message: 'Payload Nama Product IS NOT NULL!'
            })
        }
        if (!payload.tipe_item) {
            return res.status(200).send({
                code: 99,
                error: true,
                message: 'Payload Tipe Item IS NOT NULL!'
            })
        }

        if (!payload.harga) {
            return res.status(200).send({
                code: 99,
                error: true,
                message: 'Payload Harga IS NOT NULL!'
            })
        }
        if (!payload.stock) {
            return res.status(200).send({
                code: 99,
                error: true,
                message: 'Payload Stock IS NOT NULL!'
            })
        }
        ItemProduct
            .findOne({
                where: {
                    namaproduct: payload.namaproduct
                }
            })
            .then((product) => {
                if (product) {
                    return res.status(400).send({
                        code: 92,
                        error: true,
                        message: 'Barang is Existing!'
                    })
                }
                TipeItem
                    .findById(payload.tipe_item)
                    .then((result) => {
                        if (!result) {
                            return res.status(400).send({
                                code: 99,
                                error: true,
                                message: 'Item Id ' + payload.tipe_item + ' Not Found'
                            })
                        }
                        ItemProduct
                            .create(payload)
                            .then((product) => {
                                return res.status(201).send({
                                    code: '00',
                                    error: false,
                                    message: 'Success Created Data!'
                                })
                            }).catch((error) => res.status(400).send((error)))
                    }).catch((error) => res.status(400).send(error))
            }).catch((error) => res.status(400).send(error))
    },
    getAllRetrive(req, res) {
        if (req.body.isSuperUser) {

            return ItemProduct
                .findAll({
                    include: {
                        model: TipeItem,
                        as: 'tipeItems'
                    }
                })
                .then((result) => {
                    if (result.length > 0) {
                        return res.status(200).send({
                            code: '00',
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
        return res.status(401).send({
            code: 02,
            error: true,
            message: 'You Cant Access This Request Need Previledge More Than ur level!'
        })
    },
    getAll(req, res) {
        return ItemProduct
            .findAll()
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send({
                        code: '00',
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

    updateById(req, res) {

        payload = {
            namaproduct: req.body.namaproduct,
            tipe_item: req.body.tipeitem,
            harga: req.body.harga,
            stock: req.body.stock,
        }
        ItemProduct
            .findById(req.body.itemId)
            .then((result) => {
                if (result) {
                    ItemProduct
                        .update({
                            payload
                        }, {
                            where: {
                                id: result.id
                            }
                        })
                        .then((finalItem) => {
                            return res.status(202).send({
                                code: '00',
                                error: false,
                                message: 'Update Successfully!'
                            })
                        }).catch((error) => res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Item Id ' + req.body.itemId + ' Tidak Ditemukan!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    }
}