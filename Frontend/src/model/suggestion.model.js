import { OrgSuggestionApi } from "../api/org.suggestion.api.js"

export const SuggestionModel = () => {

    const api = OrgSuggestionApi()

    const getOrganisationSuggestion = async() => {
        
        let foo = await api.GetOrganisationSuggestionApi()
        let res = foo.data
        let data = res.map( item => ( { ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` } ) )
        return data

    }

    const followModel = async(data) => { return await api.FollowApi(data) }
    const unFollowModel = async(data) => { return await api.UnfollowApi(data) }

    return {
        getOrganisationSuggestion,
        followModel,
        unFollowModel
    }

}