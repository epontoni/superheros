import axios from 'axios'

import { ACCESS_TOKEN } from './access'

export default function searchByName ({ keyword = ''} = {}) {
    // const BASE_URL = `/api/${ACCESS_TOKEN}/search/${keyword}`    (localhost) with setupProxy
    const BASE_URL = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/search/${keyword}`
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}