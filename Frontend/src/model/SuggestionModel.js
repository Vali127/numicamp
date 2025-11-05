import { OrgSuggestionApi } from "../api/OrgSuggestionApi"

export const SuggestionModel = () => {

    const getOrganisationSuggestion = async() => {
        const api = OrgSuggestionApi()
        let foo = await api.GetOrganisationSuggestionApi()
        let res = foo.data
        let data = res.map( item => ( { ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` } ) )
        return data
    }

    return {
        getOrganisationSuggestion
    }

}