import axios from 'axios'

import { ACCESS_TOKEN } from './access'

export default function getSuperhero ({ id = '1'} = {}) {
    //const BASE_URL = `/api/${ACCESS_TOKEN}/${id}` (localhost) with setupProxy
    const BASE_URL = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${id}`
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}