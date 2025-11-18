import axios from "axios";


export const RegisterApi = () => {

    const SendFormForPersonalUsage = async (obj) => {
        return await axios.post("http://localhost:3000/api/register/person", obj)
    }

    const SendFormForOrganisationalUsage = async (obj) => {
        return await axios.post("http://localhost:3000/api/register/organisation", obj)
    }

    return {
        SendFormForOrganisationalUsage,
        SendFormForPersonalUsage
    }
}