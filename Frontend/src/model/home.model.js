import { AccountApi } from "../api/account.api.js"
import { API_CONFIG } from "../config.js"

export const HomeModel = () => {
    const api = AccountApi()
    const staticUrl = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users`

    const getAccountInfo = async () => {
        const res = await api.getUserAccountDataApi()
        const data = res.data
        data.photo_profil = `${staticUrl}/${data.photo_profil}`
        if (data.datenais) data.datenais = data.datenais.split('T')[0]
        if (data.date_creation)  data.date_creation  = data.date_creation.split('T')[0]
        return data
    }

    const getUserDomains = () => api.getUserDomainApi()

    return { getAccountInfo, getUserDomains }
}