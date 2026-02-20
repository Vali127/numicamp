import { dashBoardApi } from "../api/dasborad.api.js"

export const DashBoardModel = () => {
    const api = dashBoardApi()

    return {
        getUserStats: () => api.getUsersStats(),
        getDomainStats: () => api.getDomainStats(),
        getPostsStats:  () => api.getPostsStatsApi(),
    }
}