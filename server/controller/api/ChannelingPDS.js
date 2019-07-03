const https = require('https')
const axios = require('axios')
const URL = require('../../constant/Constant').URL_API
const qs = require('qs')
const GetToken = require('./AuthTokenChanneling')
let httpsAgent = new https.Agent({ rejectUnauthorized: false });
module.exports = {

    getHargaEmas(req, res) {

        GetToken.getToken().then((token) => {
            console.log(token)

            axios({
                url: URL + '/param/hargaemas',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                data: {
                    "clientId": "9997",
                    "channelId": "6017",
                    "flag": "K"
                }
            })
                .then(response => {
                    res.status(200).send({
                        data: response.data.data
                    })
                }).catch((err) => {
                    console.log(err)
                })
        });
    }
}