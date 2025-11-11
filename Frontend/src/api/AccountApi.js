import axios from "axios";

export const AccountApi = () => {
    /*
    * @param { usage } spécifie si le compte est personnelle ou organisationnelle.
    */

    const BASE_URL = 'http://localhost:3000/api/account'
    const token = localStorage.getItem('token')
    const usage = localStorage.getItem('usage')
    const data = { usage : usage }

    const accountInfoApi = async () => {
        const response = await axios.get(`${BASE_URL}/accountInfo`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params : data
        })
        return response.data
    }

    const organisationDataApi = async (id) => {
        const response = await axios.get(`${BASE_URL}/orgInfo`, {
            params : { id_org : id }
        })
        return response.data
    }

    const userDomainApi = async () => {
        const response = await axios.get(`${BASE_URL}/userDomains`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            params : data
        })
        return response.data
    }

    return {
        accountInfoApi,
        userDomainApi,
        organisationDataApi
    }
}