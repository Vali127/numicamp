import {LogoutApi} from "../api/logout.api.js";


export function LogoutModel() {
    const API = LogoutApi()

    const logout = async (token) => {
        return await API.logoutAPI(token)
    }

    return {
        logout,
    }
}