import axios from "axios"
import { API_CONFIG } from '../config.js'


export const searchApi = () => {
    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/search`
    const token = localStorage.getItem('token')

    const searchValueApi = async (obj) => {
        return axios.get( BASE_URL + "/everything", {
            headers : { Authorization : "Bearer " + token },
            params : obj
        } )
    }

    return {
        searchValueApi
    }
}