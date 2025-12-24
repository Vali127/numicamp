import axios from "axios";
import { API_CONFIG } from '../config.js'


export const RegisterApi = () => {
    
    const BASE_URL = `http://${API_CONFIG.hostname}:${API_CONFIG.port}/api/register`

    const SendFormForPersonalUsage = async (obj) => {
        return await axios.post( BASE_URL + "/person", obj)
    }

    const SendFormForOrganisationalUsage = async (obj) => {
        return await axios.post( BASE_URL + "/organisation", obj)
    }

    return {
        SendFormForOrganisationalUsage,
        SendFormForPersonalUsage
    }
}