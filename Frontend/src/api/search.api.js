import axios from "axios"


export const searchApi = () => {
    const BASE_URL = "http://localhost:3000/api/search"
    const token = localStorage.getItem('token')

    const searchValueApi = async (obj) => {
        return axios.get(`${BASE_URL}/everything`,{
            headers : { Authorization : `Bearer ${token}` },
            params : obj
        } )
    }

    return {
        searchValueApi
    }
}