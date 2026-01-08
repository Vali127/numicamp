import {statsApi} from "../api/stats.api.js";


export const statsModel = () => {

    const API = statsApi()

    const getDomains = async () => { return await API.getDomainsApi() }

    return {
        getDomains,
    }
}