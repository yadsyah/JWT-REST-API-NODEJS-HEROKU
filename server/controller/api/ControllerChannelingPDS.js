const https = require('https')
const axios = require('axios')
const URL = require('../../constant/Constant').URL_API
const qs = require('qs')
const GetToken = require('./AuthTokenChanneling')
let httpsAgent = new https.Agent({ rejectUnauthorized: false });
const errorLog = require('../../utils/logger/logger').errorlog
const successLog = require('../../utils/logger/logger').successlog
const createLog = require('../../utils/logger/logger').createlog
module.exports = {

    getHargaEmas(req, res) {
        successLog.info(`Start getHargaEmas`)
        GetToken.getToken().then((token) => {
            var payloadReq =
            {
                "clientId": "9997",
                "channelId": "6017",
                "flag": "K"
            }
            successLog.info('getHargaEmas request ', { meta: payloadReq })
            axios({
                url: URL + '/param/hargaemas',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: payloadReq
            }).then(response => {
                successLog.info(`getHargaEmas response (PDS) `, { meta: response.data })
                successLog.info('End getHargaEmas')
                if (response.data.responseCode === '00') {
                    return res.status(200).send({
                        error: false,
                        data: response.data.data
                    })
                } else {
                    return res.status(200).send({
                        error: true,
                        data: response.data
                    })
                }
            }).catch((err) => {
                console.error(err)
                errorLog.error(`getHargaEmas `, { meta: err })
                res.status(500).send({
                    error: true,
                    data: err
                })
            })
        });
    }
}