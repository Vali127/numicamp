import createClient from './modules/api.client.js'

export const LoginApi = () => {
    const client = createClient('login')

    return {
        submitLogin: (obj) => client.post("checkLoginInfo", obj),
    }
}