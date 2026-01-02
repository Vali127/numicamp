import axios from "axios";
import { API_CONFIG } from "../config.js";

export const AccountApi = () => {

    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/account`
    const token = localStorage.getItem('token')
    const type_of_user = localStorage.getItem('usage')
    const data = { usage : type_of_user }


    const getUserAccountDataApi = async () => {
        const response = await axios.get( BASE_URL + "/accountInfo", {
            headers: { 'Authorization': "Bearer " + token },
            params : data
        })
        return response.data
    }

    const getOrganisationDataApi = async (id) => {
        const response = await axios.get( BASE_URL + "/orgInfo", {
            params : { id_org : id }
        })
        return response.data
    }

    const getPersonDataApi = async (id) => {
        const response = await axios.get( BASE_URL + "/personInfo", {
            params : { id_person : id }
        })
        return response.data
    }

    const getUserDomainApi = async () => {
        const response = await axios.get( BASE_URL + "/userDomains", {
            headers: { 'Authorization' : "Bearer " + token },
            params : data
        })
        return response.data
    }



    return {
        getUserAccountDataApi,
        getUserDomainApi,
        getOrganisationDataApi,
        getPersonDataApi
    }
}
