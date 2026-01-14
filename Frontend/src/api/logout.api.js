import axios from 'axios'
import { API_CONFIG } from "../config.js";

export function LogoutApi() {

    const logoutAPI = async (token) => {
        return await axios.post(`http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/logout/logout`, null, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    return {
        logoutAPI
    }

}