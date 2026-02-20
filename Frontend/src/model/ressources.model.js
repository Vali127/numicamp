import { RessourcesApi } from "../api/ressources.api.js"

export const ressourcesModel = () => {
    const api = RessourcesApi()

    return {
        getNews: () => api.getNewsApi(),
        getSites: () => api.getSitesApi(),
        getList: () => api.getListApi(),
        deleteResource: (id, type) => api.deleteApi(id, type),
        createResource: (data) => api.registerApi(data),
    }
}