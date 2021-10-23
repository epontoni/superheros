import axios from 'axios'

const BASE_URL = 'https://challenge-react.alkemy.org/'

export default function getLoginToken ({ email = '', password = ''} = {}) {
    const request = axios.post(BASE_URL, {
        "email" : email,
        "password" : password
    })
    return request.then(response => response.data)
}