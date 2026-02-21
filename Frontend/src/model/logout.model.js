import { LogoutApi } from "../api/logout.api.js"

export const LogoutModel = () => {
    const API = LogoutApi()

    return {
        logout: () => API.logoutAPI()
    }
}