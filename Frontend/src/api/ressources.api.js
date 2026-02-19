import createClient from './modules/api.client.js'

export const RessourcesApi = () => {
    const client = createClient('resources')
    const auth = { headers: client.getAuth() }

    return {
        getListApi:  ()          => client.get("lists",    auth),
        registerApi: (data)      => client.post("register", data, auth),
        deleteApi:   (id, type)  => client.delete("remove", { ...auth, params: { link: id, type } }),
        getNewsApi:  ()          => client.get("news",     auth),
        getSitesApi: ()          => client.get("sites",    auth),
    }
}