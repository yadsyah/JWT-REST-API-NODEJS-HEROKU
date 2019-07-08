const User = require('../db/models').TblUser;
const Group = require('../db/models').TblGroup;
const db = require('../db/models/index');
const Op = db.Sequelize.Op;

checkGroupAndDuplicateUserNameOrEmail = (req, res, next) => {
    Group.findOne({
        where: {
            groupId: req.body.groupId
        }
    }).then(group => {
        if (group) {
            User.findOne({
                where: {
                    [Op.or]: [{username: req.body.username}, {email: req.body.email}]
                }
            }).then(user => {
                if (user) {
                    return res.status(400).send({
                        code: 99,
                        error: true,
                        message: 'Fail -> Username or email is already taken!'
                    });
                }
                next();
            });
        } else {
            return res.status(400).send({
                code: 99,
                error: true,
                message: 'GroupId Not Found!'
            })
        }
    }).catch((error) =>
        res.status(400).send(error)
    )
};

isAdmin = (req, res, next) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        if (user.groupId=='00') {
            next();
        } else {
            return res.status(403).send("Require Admin Role!");
        }
    })
};

const signUpVerify = {};
signUpVerify.checkGroupAndDuplicateUserNameOrEmail = checkGroupAndDuplicateUserNameOrEmail;
signUpVerify.isAdmin = isAdmin;

module.exports = signUpVerify;