const User = require('../../db/models').User
const bCrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const SeedRandom = require('seedrandom')

module.exports = {
    create(req, res) {

        var generateKodeKaryawan = (name, email) => {
            return 'P' + Math.abs(SeedRandom(name + email).int32());
        }

        payload = {
            name: req.body.name,
            email: req.body.email,
            kode_karyawan: generateKodeKaryawan(req.body.name),
            isAdmin: req.body.isadmin
        }

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
                        kode_karyawan: generateKodeKaryawan(req.body.name, req.body.email).substring(0, 5),
                        password: userPassword,
                        isAdmin: req.body.isAdmin ? 1 : 0
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
                    if (userInfo) {
                        console.log(userInfo.isAdmin)
                        if (bCrypt.compareSync(req.body.password, userInfo.password)) {
                            if (userInfo.isAdmin) {
                                const token = jwt.sign({
                                    id: userInfo.id,
                                    name: userInfo.name,
                                    kodeKaryawan: userInfo.kode_karyawan,
                                    isSuperUser: userInfo.isAdmin
                                }, req.app.get('secretKey'), {
                                    expiresIn: '24h'
                                })
                                res.status(202).send({
                                    status: 'success',
                                    message: 'User Found!',
                                    isSuperUser: userInfo.isAdmin,
                                    data: {
                                        user:userInfo
                                    },
                                    token: token
                                })
                            } else {
                                const token = jwt.sign({
                                    id: userInfo.id,
                                    name: userInfo.name,
                                    kodeKaryawan: userInfo.kode_karyawan,
                                    isSuperUser: userInfo.isAdmin
                                }, req.app.get('secretKey'), {
                                    expiresIn: '1h'
                                })
                                res.status(202).send({
                                    status: 'success',
                                    message: 'User Found!',
                                    isSuperUser: userInfo.isAdmin,
                                    data: {
                                        user:userInfo
                                    },
                                    token: token
                                })
                            }
                        } else {
                            res.json({
                                status: "error",
                                message: "Invalid email/password",
                                data: null
                            })
                        }
                    } else {
                        res.status(400).send({
                            code: 90,
                            error: true,
                            message: 'Data Not Found!'
                        })
                    }
                }
            })
    },
    getAllUser(req,res){
        console.log(req.body.isSuperUser)
        console.log(req.body.kodeKaryawan)
            return User.
                    findAll()
                    .then((users)=>{
                        res.status(200).send({
                            code:'00',
                            error:false,
                            message:'success',
                            data:users
                        })
                    })
        // return res.status(400).send({
        //     code:02,
        //     error:true,
        //     message:'User Not Authorization/Previledge For This Request!'
        // })
    }
}
