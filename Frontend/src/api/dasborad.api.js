import axios from "axios";
import { API_CONFIG } from '../config.js'


export const dashBoardApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/stats`
    const token = localStorage.getItem("token")

    const getUsersStats = async () => {
        const response = await axios.get(BASE_URL + "/usersStats", {
            headers: { Authorization: "Bearer " + token  }
        })
        return response.data
    }

    const getDomainStats = async () => {
        const response = await axios.get(BASE_URL + "/domainsStats", {
            headers: { Authorization: "Bearer " + token }
        })
        return response.data
    }

    const getPostsStatsApi = async () => {
        const response = await axios.get(BASE_URL + "/postsStats", {
            headers: { Authorization: "Bearer " + token }
        })
        return response.data
    }


    return {
        getUsersStats,
        getDomainStats,
        getPostsStatsApi,
    }

}