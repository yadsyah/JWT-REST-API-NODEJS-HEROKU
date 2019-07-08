const User = require('../../db/models').TblUser

module.exports = {
    getMeUser(req, res) {
        User
            .findOne({
                where: {
                    id: req.body.userId
                }
            })
            .then((result) => {
                if (result) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                } else {
                    return res.status(200).send({
                        code: "00",
                        error: true,
                        data: 'Data not found!'
                    })
                }
            }).catch((error) => {
                console.log(error)
                return res.status(400).send({
                    code: "90",
                    error: true,
                    data: error
                })
            })
    }
}
