const User = require('../../db/models').TblUser;
const Group = require('../../db/models').TblGroup;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/models/index');
const Op = db.Sequelize.Op;

exports.signUp = (req, res) => {
    // let generateKodeKaryawan = (name, email) => {
    //     return 'P' + Math.abs(SeedRandom(name + email).int32());
    // };
    const generateCrypt = (password) => {
        return bcrypt.hashSync(password, 8);
    };
    User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: generateCrypt(req.body.password),
        groupId: req.body.groupId
    }).then((result, err) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "success",
                message: "User Added successfully!!",
            })
        }
    }).catch((error) =>{
        res.status(400).send(error)
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        where: {
            [Op.or]: [
                {username: req.body.usernameOrEmail},
                {email: req.body.usernameOrEmail}
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                code: 99,
                error: true,
                message: 'User Not Found!'
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                accessToken: null,
                reason: 'Invalid Password!'
            });
        }
        Group.findOne({
            where: {
                groupId: user.groupId
            }
        }).then(group => {
            if (group) {
                const token = jwt.sign(
                    { id: user.id },
                    req.app.get('secretKey'),
                    { expiresIn: 86400 } // expires in 24 hours
                );
                return res.status(200).send({
                    auth: true,
                    accessToken: token,
                    username: user.username,
                    groupId: group.groupId
                })
            } else {
                return res.status(404).send({
                    code: 99,
                    error: true,
                    message: 'User Not Found!'
                });
            }
        }).catch(err =>{
            res.status(500).send({ reason: err.message });
        })
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
};

exports.getUserById = (req, res) => {
    return User.findOne({
        where: {
            id: req.params.userid
        }
    }).then((result) => {
        if (result) {
            return res.status(200).send({
                code: '00',
                error: false,
                data: result
            })
        }
        return res.status(400).send({
            code: 99,
            error: true,
            message: 'Data Not Found!'
        })
    }).catch((error) => res.status(400).send(error))
};

exports.getUserByUsername = (req, res) => {
    return User.findOne({
        where: {
            username: req.params.username
        }
    }).then((result) => {
        if (result) {
            return res.status(200).send({
                code: '00',
                error: false,
                data: result
            })
        }
        return res.status(400).send({
            code: 99,
            error: true,
            message: 'Data Not Found!'
        })
    }).catch((error) => res.status(400).send(error))
};

exports.checkUsernameAvailability = (req, res) => {
    return User.findOne({
        where: {
            username: req.params.username
        }
    }).then((result) => {
        if (!result) {
            return res.status(200).send({
                available: true,
            })
        } else {
            return res.status(200).send({
                available: false,
            })
        }
    }).catch((err) => {
        return res.status(500).send({
            error: true,
            message: err
        })
    })
};

exports.checkEmailAvailability = (req, res) => {
    return User.findOne({
        where: {
            email: req.params.email
        }
    }).then((result) => {
        if (!result) {
            return res.status(200).send({
                available: true,
            })
        } else {
            return res.status(200).send({
                available: false,
            })
        }
    })
};

exports.getAllUser = (req, res) => {
    console.log('IS ADMIN : ' + req.body.isSuperUser)
    if (req.body.isSuperUser) {
        return User.
        findAll()
            .then((result) => {
                console.log(result)
                if (result.length > 0) {
                    res.status(200).send({
                        code: '00',
                        error: false,
                        message: 'success',
                        data: result
                    })
                } else {
                    res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'Data Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    }
    return res.status(400).send({
        code: '02',
        error: true,
        message: 'User Not Authorization/Previledge For This Request!'
    })
};

exports.getAllUsers = (req, res) => {
    return User.findAll().then(result => {
        console.log('getAll')
        res.status(200).send({
            data: result
        })
    }).catch((error) => res.status(400).send(error))
};
