const User = require('../../db/models').User

module.exports = {
    getMeUser(req, res) {
        return User
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
                }
            }).catch((error) => {
                console.log(error)
                res.status(400).send(error)
            })
    }
}
