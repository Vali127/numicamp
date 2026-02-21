import axios from "axios";
import { API_CONFIG } from '../../config.js'

const createClient = (path) => {
    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/${path}`
    const getAuth  = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

    return {
        get:    (endpoint, config = {}) =>
            axios.get(`${BASE_URL}/${endpoint}`, config).then(r => r.data),
        post:   (endpoint, data, config = {}) =>
            axios.post(`${BASE_URL}/${endpoint}`, data, config).then(r => r.data),
        put:    (endpoint, data, config = {}) =>
            axios.put(`${BASE_URL}/${endpoint}`, data, config).then(r => r.data),
        delete: (endpoint, config = {}) =>
            axios.delete(`${BASE_URL}/${endpoint}`, config).then(r => r.data),
        getAuth,
    }
}

export default createClient