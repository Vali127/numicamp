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

    const registerApi = async (data) => {
        const response = await axios.post(BASE_URL + "/register", data, {
            headers : { Authorization: `Bearer ${token}` },
        })
        return response.data
    }

    const deleteApi = async (id, type) => {
        const result = await axios.delete(BASE_URL + "/remove", {
            headers : { Authorization: `Bearer ${token}` },
            params : { link : id, type : type }
        })
        return result.data
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
        deleteApi,
        getSitesApi,
        getListApi,
        registerApi,
    }
}