import axios from "axios"

export const OrgSuggestionApi = () => {

    const BASE_URL = 'http://localhost:3000/api/organisation/'
    const token = localStorage.getItem('token')

    const GetOrganisationSuggestionApi = async() => {
        const response = await axios.get(`${BASE_URL}orgDomain`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.data
    }

    const FollowApi = async(data) => {
        const response = await axios.post(`${BASE_URL}follow`, data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        return response
    }

    const UnfollowApi = async(data) => {
        const response = await axios.post(`${BASE_URL}unfollow`, data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        return response
    }

    return {
        GetOrganisationSuggestionApi,
        FollowApi,
        UnfollowApi
    }

}