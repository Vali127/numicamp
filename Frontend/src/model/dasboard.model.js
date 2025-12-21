import {dashBoardApi} from "../api/dasborad.api.js";


export const DashBoardModel = () => {

    const api = dashBoardApi()

    const getUserStats = async () => {
        return await api.getUsersStats()
    }

    const getDomainStats = async () => {
        return await api.getDomainStats()
    }

    const getPostsStats = async () => {
        return await api.getPostsStatsApi()
    }

    return {
        getUserStats,
        getDomainStats,
        getPostsStats,
    }
}