const https = require('https')
const axios = require('axios')
const URL = require('../../constant/Constant').URL_API
const qs = require('qs')
const GetToken = require('./AuthTokenChanneling')
let httpsAgent = new https.Agent({ rejectUnauthorized: false });
module.exports = {

    getHargaEmas(req, res) {
        var reqBody = {
            'grant_type': 'password',
            'username': '9997',
            'password': 'pgd123!'
        }
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic YXBsaWthc2lwZHM6cGdkMTIzIQ=='
        }
        var getToken = GetToken.getTokenAsync()
        console.log('GETTOKEN__'+GetToken.getToken())
        axios({
            url: URL + '/param/hargaemas',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + response.data.access_token
            },
            data: qs.stringify({
                'clientId': '9997',
                'channelId': '6017',
                'flag': 'K'
            })
        })
            .then(getHargaEmasResponse => {
                console.log(getTokenResponse.data)
                console.log(getHargaEmasResponse.data)
            }).catch((err) => {
                console.log(err)
            })
    }
}