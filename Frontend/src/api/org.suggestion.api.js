import axios from "axios"
import { API_CONFIG } from '../config.js'

export const OrgSuggestionApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/organization`
    const token = localStorage.getItem('token')

    const getOrganisationSuggestionApi = async() => {
        const response = await axios.get( BASE_URL + "/suggestion", {
            headers: { 'Authorization': "Bearer " + token }
        })
        return response.data
    }

    const followApi = async(data) => {
        return await axios.post( BASE_URL + "/follow", data, {
            headers: { 'Authorization' : "Bearer " + token }
        })
    }

    const unfollowApi = async(data) => {
        return await axios.post( BASE_URL + "/unfollow", data, {
            headers: { 'Authorization' : "Bearer " + token }
        })
    }

    return {
        getOrganisationSuggestionApi,
        followApi,
        unfollowApi
    }

}