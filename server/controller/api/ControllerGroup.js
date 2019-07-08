const Group = require('../../db/models').TblGroup;
const client = require('../../loader/redis.config');

exports.createGroup = (req, res) => {
    Group.create({
        groupId: req.body.groupId,
        groupName: req.body.groupName,
        isActive: req.body.isActive
    }).then(group => {
        res.status(200).send({
            status: "00",
            message: 'Group has created!'+group.groupId
        }).end();
        client.setValue(("GROUP:".concat(req.body.groupId)), JSON.stringify(group)).then(result => {
            console.log(result)
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
};

exports.findAll = (req, res) => {
    Group.findAll().then( group => {
        res.status(200).send({
            status: '00',
            message: 'success',
            data: group
        });
    });
};

exports.findByGroupId = (req, res) => {
    const groupId = req.params.groupId;
    client.getValue("GROUP:".concat(groupId)).then((result) => {
        if (result) {
            console.log("response from redis");
            return res.json({
                status: "00",
                message: "success",
                data: JSON.parse(result)
            }).end();
        } else {
            Group.findOne({
                where: {groupId: groupId}
            }).then(group => {
                client.setValue(("GROUP:".concat(groupId)), JSON.stringify(group)).then(result =>{
                    console.log(result)
                }).end();
                return res.json({
                    status: "00",
                    message: "success",
                    data: group
                });
            }).catch(error => {
                console.log(error);
                return res.json(error.toString());
            });
        }
    });
};

exports.update = (req, res) => {
    const groupId = req.params.groupId;
    Group.update(
        { groupName: req.body.groupName },
        { isActive: req.body.isActive },
        { where: {groupId: groupId} }
    ).then((group) => {
        res.status(200).send({
            status: "00",
            message: 'Param has updated!'+group.groupId
        }).end();
        client.setValue(("GROUP:".concat(group.groupId)), JSON.stringify(group)).then(result => {
            console.log(result)
        });
    }).catch(err =>{
        res.status(500).send({ reason: err.message });
    });
};

exports.delete = (req, res) => {
    const groupId = req.params.groupId;
    Group.destroy({
        where: { groupId: groupId }
    }).then(() => {
        res.status(200).send('deleted successfully a param with id = ' + groupId);
    }).catch(err =>{
        res.status(500).send({ reason: err.message });
    });
};