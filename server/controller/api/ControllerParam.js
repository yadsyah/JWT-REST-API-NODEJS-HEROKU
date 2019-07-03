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
            key: req.body.key_,
            value: req.body.value_,
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
                    reject(res.status(500).send({
                        code: "99",
                        error: true,
                        data: err
                    }))
                })
        })
    }
}