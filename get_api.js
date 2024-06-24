import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        'checks': ['rate>0.95']
    }
}

export default function () {

    let url = 'https://run.mocky.io/v3/47565135-e942-4c4d-9818-6e4812045f39'

    let headerParams = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = http.get(url, headerParams)

    check(response, {
        'is status 200': (r) => r.status === 200,
        'is message success': (res) => JSON.parse(res.body).message == "hello world"
    })

    let body = JSON.parse(response.body)
    // console.log('body is ', JSON.stringify(body))
    // console.log('message : ', body.message)
    // console.log('code : ', body.code)

}