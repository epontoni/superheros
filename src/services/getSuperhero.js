import axios from 'axios'

const ACCESS_TOKEN = '10208995463121973'

export default function getSuperhero ({ id = '1'} = {}) {
    const BASE_URL = `/api/${ACCESS_TOKEN}/${id}`
    const request = axios.get(BASE_URL)
    return request.then(response => response.data)
}