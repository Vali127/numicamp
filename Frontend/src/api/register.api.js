import axios from "axios";


export const RegisterApi = () => {
    
    const BASE_URL = "http://localhost:3000/api/register"

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