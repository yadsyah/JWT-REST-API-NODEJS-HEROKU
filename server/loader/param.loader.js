const client = require('../loader/redis.config');
const tblParam = require('../db/models/tbl_param');

const Load = () => {
    tblParam.findAll().then(params => {
        params.forEach(param => {
            client.setValue((param.KEY_), JSON.stringify(param));
        })
    })
};

exports.Load = Load;
