const client = require('../loader/redis.config');
const TblParam = require('../db/models').TblParam;

const Load = () => {
    TblParam.findAll().then(params => {
        params.forEach(param => {
            client.setValue("PARAM:".concat(param.key_), JSON.stringify(param)).then(()=>{
                console.log("");
            });
        })
    })
};

exports.Load = Load;
