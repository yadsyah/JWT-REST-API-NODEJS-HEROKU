const axios = require('axios')
const qs = require('qs')
const URL = require('../../constant/Constant').URL_API


module.exports = {
    getTokenPDS(req, res) {
        axios({
            url: URL + '/oauth/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YXBsaWthc2lwZHM6cGdkMTIzIQ=='
            },
            data: qs.stringify({
                'grant_type': 'password',
                'username': '9997',
                'password': 'pgd123!'
            })
        }).then(response => {
            return res.status(response.status).send({
                status: response.status,
                data: response.data
            })
        }).catch((err) => {
            return res.status(500).send({
                status: 'ERROR',
                data: 'ERROR'
            })
        })

    }
}
const getTokenAsync = async (next) => {

    const token = await getToken()
    console.log('getTokenSync ' + token)
    return token;
}
const getToken = async () => {
    axios({
        url: URL + '/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic YXBsaWthc2lwZHM6cGdkMTIzIQ=='
        },
        data: qs.stringify({
            'grant_type': 'password',
            'username': '9997',
            'password': 'pgd123!'
        })
    }).then( async res => {
        // console.log('res.data.access_token ' + res.data.access_token)
        return await res.data.access_token;
    }).catch((err) => {
        console.error(err)
    })
}
function getFunctionTest() {
    return '1234'
}
module.exports = {
    getToken: getToken,
    getFunctionTest: getFunctionTest,
    getTokenAsync: getTokenAsync
}