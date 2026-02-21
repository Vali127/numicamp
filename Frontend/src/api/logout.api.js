import createClient from './modules/api.client.js'

export const LogoutApi = () => {
    const client = createClient('logout')

    return {
        logoutAPI: () => client.post("logout", null, { headers: client.getAuth() }),
    }
}