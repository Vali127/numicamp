import axios from "axios";


export const SignInFormApi = () => {

    const SendFormForPersonalUsage = async (obj) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return await axios.post("http://localhost:3000/api/register/person", obj)
        } catch (error) {
            throw error
        }
    }

    const SendFormForOrganisationalUsage = async (obj) => {
        // eslint-disable-next-line no-useless-catch
        try {
            return await axios.post("http://localhost:5000/organisation/Data", obj);
        } catch (error) {
            throw error;
        }
    }

    return {
        SendFormForOrganisationalUsage,
        SendFormForPersonalUsage
    }
}