import { OrgSuggestionApi } from "../api/org.suggestion.api.js"

export const SuggestionModel = () => {

    const api = OrgSuggestionApi()

    const getOrganisationSuggestion = async() => {
        
        let foo = await api.getOrganisationSuggestionApi()
        let res = foo.data
        return res.map( item => ( { ...item, photo_profil : `http://localhost:3000/static/users/${item.photo_profil}` } ) )

    }

    const followModel = async(data) => { return await api.followApi(data) }
    const unFollowModel = async(data) => { return await api.unfollowApi(data) }

    return {
        getOrganisationSuggestion,
        followModel,
        unFollowModel
    }

}