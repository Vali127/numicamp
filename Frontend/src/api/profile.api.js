import axios from "axios";


export const profileApi = () => {

    const  BASE_URL = "http://localhost:3000/api/profile"
    const  token = localStorage.getItem("token")

    const getProfileDataApi = async(obj) => {
        const res = await  axios.get(`${BASE_URL}/info`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: obj
        } )
        return res.data
    }

    const updateProfileDataApi = async(obj) => {
        const res = await  axios.post(`${BASE_URL}/update`, obj, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data
    }

    return {
        getProfileDataApi,
        updateProfileDataApi,
    }
}