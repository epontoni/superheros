import axios from 'axios'

function login ({ email = '', password = ''} = {}) {
    const BASE_URL = "http://challenge-react.alkemy.org";
    const request = axios.post(BASE_URL, {
        email: 'asd@asd.com',
        password: '123'
    })
    return request.then(response => response.data)
}

login()