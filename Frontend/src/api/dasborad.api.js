import axios from "axios";


export const dashBoardApi = () => {

    const BASE_URL = "http://localhost:3000/api/stats"
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


    return {
        getUsersStats,
        getDomainStats,
    }

}