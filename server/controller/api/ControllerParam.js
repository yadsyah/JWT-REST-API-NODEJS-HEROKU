const Param = require('../../db/models/').TblParam;
const client = require('../../loader/redis.config');

exports.create = (req, res) => {
    Param.create({
        key_: req.body.key_,
        value_: req.body.value_,
        description: req.body.description
    }).then(param => {
        res.status(200).send({
            status: "00",
            message: 'Param has created!'+param.key_
        }).end();
        client.setValue(("PARAM:".concat(req.body.key_)), JSON.stringify(param)).then(result => {
            console.log(result)
        });
    }).catch(err => {
        res.status(500).send({ reason: err.message });
    });
};

exports.findAll = (req, res) => {
    Param.findAll().then( params => {
        res.status(200).send({
            status: '00',
            message: 'success',
            data: params
        });
    });
};

exports.findByKey = (req, res) => {
    const key_ = req.params.key_;
    client.getValue("PARAM:".concat(key_)).then((result) => {
        if (result) {
            console.log("response from redis");
            return res.json({
                status: "00",
                message: "success",
                data: JSON.parse(result)
            }).end();
        } else {
            Param.findOne({
                where: {key_: key_}
            }).then(param => {
                client.setValue(("param:".concat(key_)), JSON.stringify(param)).then(result =>{
                    console.log(result)
                }).end();
                return res.json({
                    status: "00",
                    message: "success",
                    data: param
                });
            }).catch(error => {
                console.log(error);
                return res.json(error.toString());
            });
        }
    });
};

exports.update = (req, res) => {
    const key_ = req.params.key_;
    Param.update(
        { value_: req.body.value_ },
        { description: req.body.description },
        { where: {key_: key_} }
    ).then((param) => {
        res.status(200).send({
            status: "00",
            message: 'Param has updated!'+param.key_
        }).end();
        client.setValue(("PARAM:".concat(param.key_)), JSON.stringify(param)).then(result => {
            console.log(result)
        });
    }).catch(err =>{
        res.status(500).send({ reason: err.message });
    });
};

exports.delete = (req, res) => {
    const key_ = req.params.key_;
    Param.destroy({
        where: { key_: key_ }
    }).then(() => {
        res.status(200).send('deleted successfully a param with id = ' + key_);
    }).catch(err =>{
        res.status(500).send({ reason: err.message });
    });
};