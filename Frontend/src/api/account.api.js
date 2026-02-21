import createClient from './modules/api.client.js'

export const AccountApi = () => {
    const client = createClient('account')
    const data = { usage: localStorage.getItem('usage') }
    const auth = { headers: client.getAuth() }

    return {
        getUserAccountDataApi:  ()    => client.get("accountInfo", { ...auth, params: data }),
        getUserDomainApi:       ()    => client.get("userDomains",  { ...auth, params: data }),
        getOrganisationDataApi: (id)  => client.get("orgInfo",     { params: { id_org: id } }),
        getPersonDataApi:       (id)  => client.get("personInfo",  { params: { id_person: id } }),
    }
}