import axios from "axios"
import { API_CONFIG } from '../config.js'

export const RessourcesApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/ressources`
    const token = localStorage.getItem('token')

    const getListApi = async () => {
        const response = await axios.get(BASE_URL + "/lists", {
            headers : { Authorization: `Bearer ${token}` },
        })
        return response.data
    }

    const getNewsApi = async () => {
        
        const res = await axios.get( BASE_URL + "/news", {
            headers : { 'Authorization' : "Bearer " + token }
        } )
        
        return res.data
    }

    const getSitesApi = async () => {
        
        const res = await axios.get( BASE_URL + "/sites", {
            headers : { 'Authorization' : "Bearer " + token }
        } )
        
        return res.data
    }

    return {
        getNewsApi,
        getSitesApi,
        getListApi
    }
}