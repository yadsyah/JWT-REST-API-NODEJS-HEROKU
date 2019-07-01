const https = require('https')
const axios = require('axios')
const URL = require('../../constant/Constant').URL_API
const qs = require('qs')
const GetToken = require('./AuthTokenChanneling')
let httpsAgent = new https.Agent({ rejectUnauthorized: false });
module.exports = {

    getHargaEmas(req, res) {

        var token = GetToken.getToken()
        console.log(token)
        axios({
            url: URL + '/param/hargaemas',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjIxNDYxMDMsInVzZXJfbmFtZSI6InRlc3QiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiYXV0aG9yaXRpZXMiOlsiVVNTRVIiXSwianRpIjoiYWIxMWUxNDgtYjBiYi00ZWYzLWE4ZWItNzI1NTUyNzQ4ZDc1IiwiY2xpZW50X2lkIjoiYXBsaWthc2lqcyJ9.nthX-2EushjNiYDlOh3FjzPWP2shYDjMxrTgkMAH_qpZBlOxvT5pDqgHCsFYrknSL8ppDja5WsH8LMeCzi0lqjlJMvdf_N3leRsA038F3trSoZiScLEo5TGojGdz1a-IpUe07VM8r2NYJSMYU55_-R3oY5fkBlCwcZB6NukMfdyzIqP_BrzYm4xbcZv-uxDT0fP3qOAnXmVmD8g61xYH1bJSvOuruN4HAd89WZtXTcowbeTp5pdA9XG-8IMGsJ9n5Pw6sSsHeXtU770nIIlVnftXeq7mgVQ93h20GmEEKzA3qU5y0QfmDSw4rCHGAhU7NDzP2ZOGPbXiTMiWV2sUYA'
            },
            data: {
                "clientId": "9997",
                "channelId": "6017",
                "flag": "K"
            }
        })
            .then(response => {
                res.status(200).send({
                    data: response.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }
}