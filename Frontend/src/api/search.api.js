import createClient from './modules/api.client.js'

export const searchApi = () => {
    const client = createClient('search')

    return {
        searchValueApi: (obj) => client.get("everything", { headers: client.getAuth(), params: obj }),
    }
}