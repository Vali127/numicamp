import { statsApi } from "../api/stats.api.js"

export const statsModel = () => {
    const API = statsApi()

    return {
        getDomains: () => API.getDomainsApi(),
    }
}