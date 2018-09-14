const StatusOrder = require('../../db/models').status_order


module.exports = {

    getAll(req, res) {

        return StatusOrder
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
                    code: 90,
                    error: true,
                    message: 'Data Not Found!'
                })
            }).catch((error) => res.status(400).send(error))
    }
}