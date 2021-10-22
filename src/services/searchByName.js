import axios from 'axios'

const ACCESS_TOKEN = '10208995463121973'

export default function searchByName ({ keyword = ''} = {}) {
    const BASE_URL = `/api/${ACCESS_TOKEN}/search/${keyword}`
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}