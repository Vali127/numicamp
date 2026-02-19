import createClient from './modules/api.client.js'

export const RegisterApi = () => {
    const client = createClient('register')

    return {
        SendFormForPersonalUsage:       (obj) => client.post("person",       obj),
        SendFormForOrganisationalUsage: (obj) => client.post("organisation", obj),
    }
}