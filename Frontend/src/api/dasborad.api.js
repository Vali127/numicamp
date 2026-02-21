import createClient from './modules/api.client.js'

export const dashBoardApi = () => {
    const client = createClient('stats')
    const auth = { headers: client.getAuth() }

    return {
        getUsersStats:    () => client.get("usersStats",   auth),
        getDomainStats:   () => client.get("domainsStats", auth),
        getPostsStatsApi: () => client.get("postsStats",   auth),
    }
}