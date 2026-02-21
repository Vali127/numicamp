import createClient from './modules/api.client.js'

export const OrgSuggestionApi = () => {
    const client = createClient('organization')
    const auth = { headers: client.getAuth() }

    return {
        getOrganisationSuggestionApi: ()     => client.get("suggestion", auth),
        followApi: (data) => client.post("follow",    data, auth),
        unfollowApi: (data) => client.post("unfollow",  data, auth),
    }
}