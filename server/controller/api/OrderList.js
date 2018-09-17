const ListOrder = require('../../db/models').ListOrder
const ItemProduct = require('../..//db/models').item_product
const StatusOrder = require('../../db/models').status_order
const Customer = require('../../db/models').Customer
const Alamat = require('../../db/models').Alamat
const TipeItem = require('../../db/models').TipeItem
module.exports = {

    postOrder(req, res) {
        payload = {
            itemId: req.body.itemId,
            customerId: req.body.customerId,
            quantity: req.body.quantity,
            tanggal_order: new Date(),
            createdBy: req.body.kodeKaryawan,
            status_order: 1,
        }

        if (!payload.quantity || payload.quantity == 0) {
            return res.status(400).send({
                code: 99,
                error: true,
                message: 'Quantity Tidak Boleh (0)!'
            })
        }
        if (!payload.itemId || !payload.customerId) {
            return res.status(400).send({
                code: 98,
                error: true,
                message: 'Payload Validasi Tidak Boleh Kosong!'
            })
        }
        tempStock = 0;
        ItemProduct
            .findById(payload.itemId)
            .then((product) => {
                tempStock = product.stock
                tempHarga = product.harga
                console.log(product)
                if (product != null) {
                    console.log('MASUK PRODUCT')
                    if (tempStock == 0) {
                        return res.status(400).send({
                            code: 91,
                            error: true,
                            message: 'Stock Habis!'
                        })
                    } else if (product.stock >= payload.quantity) {
                        Customer
                            .findById(payload.customerId)
                            .then((customer) => {
                                if (customer) {
                                    ListOrder
                                        .create({
                                            itemId: req.body.itemId,
                                            customerId: req.body.customerId,
                                            quantity: req.body.quantity,
                                            tanggal_order: new Date(),
                                            createdBy: req.body.kodeKaryawan,
                                            status_order: 1,
                                            totalHarga: tempHarga * req.body.quantity
                                        })
                                        .then((listorder) => {
                                            ItemProduct
                                                .update({
                                                    stock: tempStock - payload.quantity
                                                }, {
                                                    where: {
                                                        id: product.id
                                                    }
                                                })
                                                .then((finallyProduct) => {
                                                    return res.status(201).send({
                                                        code: '00',
                                                        error: false,
                                                        message: 'Successfully Post Order!'
                                                    })
                                                }).catch((error) => res.status(400).send(error))
                                        }).catch((error) => res.status(400).send(error))
                                } else {
                                    return res.status(400).send({
                                        code: 93,
                                        error: true,
                                        message: 'Customer Not Found!'
                                    })
                                }
                            }).catch((error) => res.status(400).send(error))
                    } else {
                        return res.status(400).send({
                            code: 92,
                            error: true,
                            message: 'Stock Tidak Mencukupi Untuk Pembelian ' + payload.quantity + ' Unit'
                        })
                    }
                } else {
                    return res.status(400).send({
                        code: 99,
                        error: true,
                        message: 'Item Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))

    },
    getAllRetrive(req, res) {

        return ListOrder
            .findAll({
                include: [{
                    model: StatusOrder,
                    as: 'statusOrders',
                    attributes: ['id', 'name_status']
                }, {
                    model: Customer,
                    as: 'customers',
                    attributes: ['id', 'customername', 'nohp', 'email', 'tanggal_lahir', 'noktp'],
                    include: {
                        model: Alamat,
                        as: 'alamats',
                        attributes: ['id', 'address', 'kodepos', 'kota', 'negara']
                    }
                }, {
                    model: ItemProduct,
                    as: 'itemProducts',
                    attributes: ['id', 'namaproduct', 'harga', 'stock', 'createdBy'],
                    include: {
                        model: TipeItem,
                        as: 'tipeItems',
                        attributes: ['id', 'namaTipe']
                    }
                }],
                attributes: ['id', 'quantity', 'tanggal_order', 'createdBy']

            })
            .then((result) => {
                return res.status(200).send({
                    code: '00',
                    error: false,
                    data: result
                })
            }).catch((error) => res.status(400).send(error))

    },
    getAll(req, res) {
        return ListOrder
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
                    code: 99,
                    error: true,
                    message: 'Data Not Found'
                })
            }).catch((error) => res.status(400).send(error))
    },
    updateStatusOrder(req, res) {

        return ListOrder
            .findById(req.params.orderId)
            .then((result) => {
                if (result) {
                    ListOrder
                        .update({
                            status_order: req.body.status_order
                        }, {
                            where: {
                                id: result.id
                            }
                        })
                        .then((orderFinal) => {
                            return res.status(200).send({
                                code: '00',
                                error: false,
                                message: 'Data Successfully Update Status Order!'
                            })
                        }).catch((error) => res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Order Not Found'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    }
}