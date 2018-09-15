const User = require('../../db/models').User

module.exports = {
    getMeUser(req,res){
        return User
                .findById(req.body.userId)
                .then((result)=>{
                    if(result){
                        return res.status(200).send({
                            code:"00",
                            error:false,
                            data:result
                        })
                    }
                }).catch((error)=>res.status(400).send(error))
    }
}