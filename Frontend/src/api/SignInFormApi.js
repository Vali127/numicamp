import axios from "axios";


export const SignInFormApi = () => {

    const SendFormForPersonalUsage = async (obj) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.post("http://localhost:5000/person/Data", obj);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const SendFormForOrganisationalUsage = async (obj) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.post("http://localhost:5000/organisation/Data", obj);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return {
        SendFormForOrganisationalUsage,
        SendFormForPersonalUsage
    }
}