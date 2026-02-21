import createClient from './modules/api.client.js'

export const statsApi = () => {
    const client = createClient('stats')

    return {
        getDomainsApi: () => client.get("domains", { headers: client.getAuth() }),
    }
}