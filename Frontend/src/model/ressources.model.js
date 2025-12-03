import { RessourcesApi } from "../api/ressources.api.js"

export const ressourcesModel = () => {

    const api = RessourcesApi()

    const getNews = async() => {
        return await api.getNewsApi()
    } 

    return {
        getNews
    }

}