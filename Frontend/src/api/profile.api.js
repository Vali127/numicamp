import createClient from './modules/api.client.js'

export const profileApi = () => {
    const client = createClient('profile')
    const auth = { headers: client.getAuth() }

    return {
        getProfileDataApi:    (obj) => client.get("info",   { ...auth, params: obj }),
        updateProfileDataApi: (obj) => client.post("update", obj, auth),
    }
}