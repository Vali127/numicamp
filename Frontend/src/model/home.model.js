import {AccountApi} from "../api/account.api.js";
import { API_CONFIG } from "../config.js"

export const HomeModel = () => {
    const getAccountInfo = async () => {
        const res = await AccountApi().getUserAccountDataApi()
        res.data.photo_profil = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/static/users/${res.data.photo_profil}`
        if (res.data.datenais !== undefined ) res.data.datenais = (res.data.datenais.split('T'))[0]
        if (res.data.date_creation !== undefined ) res.data.date_creation = (res.data.date_creation.split('T'))[0]
        return res.data
    }
    
    const getUserDomains = async () => {
        return await AccountApi().getUserDomainApi()
    }

    return {
        getAccountInfo,
        getUserDomains
    }
}