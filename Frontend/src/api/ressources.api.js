import axios from "axios"

export const RessourcesApi = () => {

    const BASE_URL = "http://localhost:3000/api/ressources"
    const token = localStorage.getItem('token')

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
        getSitesApi
    }
}