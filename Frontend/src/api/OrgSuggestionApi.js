import axios from "axios"

export const OrgSuggestionApi = () => {

    const GetOrganisationSuggestionApi = async() => {
        const response = await axios.get('http://localhost:3000/api/organisation/orgDomain', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        return response.data
    }

    return {
        GetOrganisationSuggestionApi
    }

}