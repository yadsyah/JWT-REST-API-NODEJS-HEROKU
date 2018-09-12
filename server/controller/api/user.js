const User = require('../../db/models').User
const bCrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const SeedRandom = require('seedrandom')

module.exports = {
    create(req, res) {

        var generateKodeKaryawan = (name,email) => {
            return 'P' + Math.abs(SeedRandom(name+email).int32());

        }

        payload = {
            name: req.body.name,
            email: req.body.email,
            kode_karyawan: generateKodeKaryawan(req.body.name)
        }

        console.log(payload)
        let generateCrypt = (password) => {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(4), null);
        }
        let userPassword = generateCrypt(req.body.password)

        return User
            .findOne({
                where: {
                    name: req.body.name,
                    email: req.body.email
                }
            })
            .then((result) => {
                if (result) {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Nama sudah ada!'
                    })
                }
                User
                    .create({
                        name: req.body.name,
                        email: req.body.email,
                        kode_karyawan: generateKodeKaryawan(req.body.name,req.body.email).substring(0,5),
                        password: userPassword
                    })
                    .then((result, err) => {
                        if (err) {
                            next(err);
                        } else {
                            res.json({
                                status: "success",
                                message: "User Added successfully!!",
                            })
                        }

                    })
            })

    },
    authenticate(req, res, next) {
        return User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((userInfo, err) => {
                if (err) {
                    next(err)
                } else {
                    if(userInfo){
                    console.log(userInfo)
                    if (bCrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({
                            id: userInfo.id
                        }, req.app.get('secretKey'), {
                            expiresIn: '1h'
                        })
                        res.json({
                            status: 'success',
                            message: 'User Found!!',
                            data: {
                                user: {
                                    id:userInfo.id,
                                    name:userInfo.name,
                                    email:userInfo.email,
                                    kode_karyawan:userInfo.kode_karyawan
                                },
                                token: token
                            }
                        })
                    } else {
                        res.json({
                            status: "error",
                            message: "Invalid email/password",
                            data: null
                        })
                    }
                }else {
                    res.status(400).send({
                        code:90,
                        error:true,
                        message:'Data Not Found!'
                    })
                }
                }
            })
    }
}
