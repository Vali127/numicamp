import { RessourcesApi } from "../api/ressources.api.js"

export const ressourcesModel = () => {

    const api = RessourcesApi()

    const getNews = async() => { return await api.getNewsApi() }

    const deleteResource = (id, type) => { return api.deleteApi( id, type) }
    
    const getSites = async() => { return await api.getSitesApi() }

    const getList = async() => { return await api.getListApi() }

    const createResource = async (data) => { return await api.registerApi(data) }

    return {
        getNews,
        deleteResource,
        getSites,
        getList,
        createResource,
    }

}