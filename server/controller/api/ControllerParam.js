const TblParam = require('../../db/models').Tbl_Param


module.exports = {
    getAll(req, res) {
        return new Promise((resolve, reject) => {
            TblParam.findAll()
                .then((result) => {
                    if (result.length > 0) {
                        resolve(res.status(200).send({
                            code: "00",
                            error: false,
                            data: result
                        }))
                    } else {
                        resolve(res.status(200).send({
                            code: "00",
                            error: false,
                            data: result
                        }))
                    }
                }).catch((err) => {
                    reject(res.status(500).send({
                        code: "99",
                        error: true,
                        data: err
                    }))
                })
        })
    },
    createParam(req, res) {
        payload = {
            KEY_: req.body.key_,
            VALUE_: req.body.value_,
            description: req.body.description
        }
        return new Promise((resolve, reject) => {
            TblParam.create(payload)
                .then((result) => {
                    resolve(res.status(201).send({
                        code: "00",
                        error: false,
                        message: 'success',
                        data: result
                    }))
                }).catch((err) => {
                    console.error(err)
                    reject(res.status(500).send({
                        code: "99",
                        error: true,
                        data: err
                    }))
                })
        })
    },
    getParamByKey(req, res) {
        return new Promise((resolve, reject) => {
            TblParam.findOne({
                where: {
                    KEY_: req.body.key_
                },
                attributes: ['KEY_', 'VALUE_', 'description']
            }).then((result) => {
                if (result) {
                    resolve(res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    }))
                } else {
                    reject(res.status(200).send({
                        code: "80",
                        error: true,
                        message: 'Data Not Found!'
                    }))
                }
            }).catch((err) => {
                console.error(err)
                reject(res.status(200).send({
                    code: "80",
                    error: true,
                    message: err
                }))
            })
        })
    }
}