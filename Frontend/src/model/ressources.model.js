import { RessourcesApi } from "../api/ressources.api.js"

export const ressourcesModel = () => {

    const api = RessourcesApi()

    const getNews = async() => {
        return await api.getNewsApi()
    }
    
    const getSites = async() => {
        return await api.getSitesApi()
    }

    return {
        getNews,
        getSites
    }

}