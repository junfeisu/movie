import axios from 'axios'

const fetch = ({ host = 'http://localhost:8000', url = '', method = 'GET', data = {}, params = {} }) => {
    return new Promise((resolve, reject) => {
        axios.request({
            url: host + url,
            method: method,
            data: data,
            params: params
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export default fetch
